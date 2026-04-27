/**
 * SIMULATED BACKEND (Express + Vite)
 * 
 * NOTE: This server is used for the live preview in this environment.
 * The real Django backend requested is implemented in the project files:
 * - /backend/ (Django project)
 * - /users/ (Auth app)
 * - /futebol/ (Core app)
 * - /vercel.json (Vercel config)
 * - /requirements.txt (Python dependencies)
 * 
 * The API endpoints below match the Django implementation.
 */
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { createServer as createViteServer } from "vite";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "futgestao-secret-key";

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Mock Database
  const users: any[] = [];
  const players: any[] = [
    { id: "1", nome: "Gabriel Jesus", nivel_estrelas: 4.5, ativo: true, organizador: "1", data_cadastro: new Date() },
    { id: "2", nome: "Vinicius Jr", nivel_estrelas: 5.0, ativo: true, organizador: "1", data_cadastro: new Date() },
  ];
  const peladas: any[] = [];
  const peladaJogadores: any[] = [];

  // Middleware
  const authenticate = (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.userId = (decoded as any).id;
      next();
    } catch (err) {
      res.status(401).json({ message: "Invalid token" });
    }
  };

  // Auth Routes
  app.post("/api/register", async (req, res) => {
    const { name, email, password } = req.body;
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { id: Date.now().toString(), name, email, password: hashedPassword };
    users.push(user);
    const token = jwt.sign({ id: user.id }, JWT_SECRET);
    res.json({ user: { id: user.id, name, email }, token });
  });

  app.post("/api/token", async (req, res) => {
    const { email, password } = req.body;
    const user = users.find((u) => u.email === email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user.id }, JWT_SECRET);
    res.json({ user: { id: user.id, name: user.name, email }, token });
  });

  app.get("/api/me", authenticate, (req: any, res) => {
    const user = users.find(u => u.id === req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ id: user.id, name: user.name, email: user.email });
  });

  // Socket.io for Real-Time Live Game
  io.on("connection", (socket) => {
    socket.on("join-pelada", (peladaId) => {
      socket.join(`pelada-${peladaId}`);
    });

    socket.on("update-cronometro", (data) => {
      // data: { peladaId, segundos, ativo }
      socket.to(`pelada-${data.peladaId}`).emit("cronometro-changed", data);
    });

    socket.on("update-placar", (data) => {
      // data: { peladaId, placar_casa, placar_visitante }
      socket.to(`pelada-${data.peladaId}`).emit("placar-changed", data);
    });

    socket.on("novo-evento", (data) => {
      // data: { peladaId, evento }
      socket.to(`pelada-${data.peladaId}`).emit("evento-recebido", data.evento);
    });
  });

  // Players (Jogadores)
  app.get("/api/jogadores", authenticate, (req: any, res) => {
    res.json(players.filter(p => p.organizador === req.userId));
  });

  app.post("/api/jogadores", authenticate, (req: any, res) => {
    const player = { 
      id: Date.now().toString(), 
      ...req.body, 
      organizador: req.userId,
      data_cadastro: new Date() 
    };
    players.push(player);
    res.json(player);
  });

  app.put("/api/jogadores/:id", authenticate, (req: any, res) => {
    const index = players.findIndex(p => p.id === req.params.id && p.organizador === req.userId);
    if (index === -1) return res.status(404).json({ message: "Player not found" });
    players[index] = { ...players[index], ...req.body };
    res.json(players[index]);
  });

  app.delete("/api/jogadores/:id", authenticate, (req: any, res) => {
    const index = players.findIndex(p => p.id === req.params.id && p.organizador === req.userId);
    if (index === -1) return res.status(404).json({ message: "Player not found" });
    // Soft delete
    players[index].ativo = false;
    res.status(204).send();
  });

  // Peladas
  app.get("/api/peladas", authenticate, (req: any, res) => {
    res.json(peladas.filter(p => p.organizador === req.userId));
  });

  app.get("/api/peladas/:id", authenticate, (req: any, res) => {
    const pelada = peladas.find(p => p.id === req.params.id && p.organizador === req.userId);
    if (!pelada) return res.status(404).json({ message: "Pelada not found" });

    const inscritos = peladaJogadores
      .filter(pj => pj.peladaId === req.params.id)
      .sort((a, b) => a.ordem_chegada - b.ordem_chegada)
      .map(pj => {
        const player = players.find(p => p.id === pj.jogadorId);
        return {
          id: pj.id,
          jogador: pj.jogadorId,
          jogador_nome: player?.nome,
          jogador_nivel: player?.nivel_estrelas,
          ordem_chegada: pj.ordem_chegada,
          presenca_confirmada: pj.presenca_confirmada,
          pagamento_confirmado: pj.pagamento_confirmado
        };
      });

    res.json({ ...pelada, inscritos });
  });

  app.post("/api/peladas", authenticate, (req: any, res) => {
    const pelada = { 
      id: Date.now().toString(), 
      ...req.body, 
      organizador: req.userId,
      status: 'agendada'
    };
    peladas.push(pelada);
    res.json(pelada);
  });

  app.put("/api/peladas/:id", authenticate, (req: any, res) => {
    const index = peladas.findIndex(p => p.id === req.params.id && p.organizador === req.userId);
    if (index === -1) return res.status(404).json({ message: "Pelada not found" });
    peladas[index] = { ...peladas[index], ...req.body };
    res.json(peladas[index]);
  });

  // Pelada Jogadores actions
  app.post("/api/peladas/:id/jogadores", authenticate, (req: any, res) => {
    const { jogador_id } = req.body;
    const peladaId = req.params.id;
    
    const existing = peladaJogadores.find(pj => pj.peladaId === peladaId && pj.jogadorId === jogador_id);
    if (existing) return res.json(existing);

    const maxOrder = peladaJogadores.filter(pj => pj.peladaId === peladaId).length;
    const pj = {
      id: Date.now().toString(),
      peladaId,
      jogadorId: jogador_id,
      ordem_chegada: maxOrder + 1,
      presenca_confirmada: false,
      pagamento_confirmado: false
    };
    peladaJogadores.push(pj);
    res.status(201).json(pj);
  });

  app.delete("/api/peladas/:id/jogadores/:jogador_id", authenticate, (req: any, res) => {
    const index = peladaJogadores.findIndex(pj => pj.peladaId === req.params.id && pj.jogadorId === req.params.jogador_id);
    if (index !== -1) peladaJogadores.splice(index, 1);
    res.status(204).send();
  });

  app.put("/api/peladas/:id/jogadores/reordenar", authenticate, (req: any, res) => {
    const { ordem } = req.body; // array of jogadorIds
    ordem.forEach((jid: string, idx: number) => {
      const pj = peladaJogadores.find(p => p.peladaId === req.params.id && p.jogadorId === jid);
      if (pj) pj.ordem_chegada = idx + 1;
    });
    res.json({ message: "Reordenado" });
  });

  app.put("/api/peladas/:id/jogadores/confirmar-presenca", authenticate, (req: any, res) => {
    const { jogador_id, confirmar } = req.body;
    const pj = peladaJogadores.find(p => p.peladaId === req.params.id && p.jogadorId === jogador_id);
    if (pj) pj.presenca_confirmada = confirmar;
    res.json({ message: "Presença atualizada" });
  });

  app.put("/api/peladas/:id/jogadores/confirmar-pagamento", authenticate, (req: any, res) => {
    const { jogador_id, confirmar } = req.body;
    const pj = peladaJogadores.find(p => p.peladaId === req.params.id && p.jogadorId === jogador_id);
    if (pj) pj.pagamento_confirmado = confirmar;
    res.json({ message: "Pagamento atualizado" });
  });

  // PATCH /api/pelada-jogadores/:id - toggle presence or payment
  app.patch("/api/pelada-jogadores/:id", authenticate, (req: any, res) => {
    const index = peladaJogadores.findIndex(pj => pj.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: "Not found" });
    peladaJogadores[index] = { ...peladaJogadores[index], ...req.body };
    res.json(peladaJogadores[index]);
  });

  // DELETE /api/pelada-jogadores/:id - remove player from pelada
  app.delete("/api/pelada-jogadores/:id", authenticate, (req: any, res) => {
    const index = peladaJogadores.findIndex(pj => pj.id === req.params.id);
    if (index !== -1) peladaJogadores.splice(index, 1);
    res.status(204).send();
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Error starting server:", err);
});
