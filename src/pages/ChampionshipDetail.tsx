import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ChevronLeft, 
  Trophy, 
  Users, 
  Calendar, 
  Settings, 
  Plus, 
  Loader2,
  Table as TableIcon,
  Play
} from "lucide-react";
import api from "../services/api";
import { toast } from "react-hot-toast";

interface Team {
  id: string;
  nome: string;
}

interface Game {
  id: string;
  time_casa_nome: string;
  time_visitante_nome: string;
  gols_casa: number;
  gols_visitante: number;
  data_hora: string;
  status: string;
}

interface Championship {
  id: string;
  nome: string;
  formato: string;
  data_inicio: string;
  times: Team[];
  jogos: Game[];
}

const ChampionshipDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [champ, setChamp] = useState<Championship | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'tabela' | 'jogos' | 'times'>('tabela');

  useEffect(() => {
    fetchChamp();
  }, [id]);

  const fetchChamp = async () => {
    try {
      const response = await api.get(`/campeonatos/${id}/`);
      setChamp(response.data);
    } catch (error) {
      toast.error("Erro ao carregar campeonato.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateTable = async () => {
    try {
      await api.post(`/campeonatos/${id}/gerar_tabela/`);
      toast.success("Tabela gerada com sucesso!");
      fetchChamp();
    } catch (error) {
      toast.error("Erro ao gerar tabela.");
    }
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin" /></div>;
  if (!champ) return <div className="p-12 text-center text-gray-500">Campeonato não encontrado.</div>;

  return (
    <div className="space-y-6">
       <button 
        onClick={() => navigate("/championships")}
        className="flex items-center text-gray-600 hover:text-green-600 transition"
      >
        <ChevronLeft className="w-4 h-4 mr-1" /> Voltar para Campeonatos
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <Trophy className="w-40 h-40" />
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl font-black text-gray-900">{champ.nome}</h1>
          <div className="flex gap-4 mt-2">
            <span className="text-sm text-gray-500 flex items-center bg-gray-50 px-3 py-1 rounded-full">
              <Calendar className="w-4 h-4 mr-1" />
              Início: {new Date(champ.data_inicio).toLocaleDateString()}
            </span>
            <span className="text-sm text-gray-500 flex items-center bg-gray-50 px-3 py-1 rounded-full capitalize">
              <Settings className="w-4 h-4 mr-1" />
              {champ.formato.replace('_', ' ')}
            </span>
          </div>

          <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
            {[
              { id: 'tabela', icon: TableIcon, label: 'Tabela' },
              { id: 'jogos', icon: Play, label: 'Jogos' },
              { id: 'times', icon: Users, label: 'Times' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center px-6 py-2 rounded-full text-sm font-bold transition whitespace-nowrap ${
                  activeTab === tab.id ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        {activeTab === 'tabela' && (
          <div className="space-y-4">
             <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Classificação</h2>
                {champ.jogos.length === 0 && (
                   <button 
                     onClick={handleGenerateTable}
                     className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center"
                   >
                     <Play className="w-4 h-4 mr-2" />
                     Gerar Tabela
                   </button>
                )}
             </div>
             <p className="text-gray-500 text-sm italic">O cálculo de pontuação em tempo real será implementado na próxima atualização.</p>
             <table className="w-full text-sm">
                <thead className="bg-gray-50 font-bold text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-3 text-left">Time</th>
                    <th className="px-4 py-3 text-center">P</th>
                    <th className="px-4 py-3 text-center">J</th>
                    <th className="px-4 py-3 text-center">V</th>
                    <th className="px-4 py-3 text-center">E</th>
                    <th className="px-4 py-3 text-center">D</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {champ.times.map(team => (
                    <tr key={team.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3 font-bold text-gray-900">{team.nome}</td>
                      <td className="px-4 py-3 text-center font-bold">0</td>
                      <td className="px-4 py-3 text-center">0</td>
                      <td className="px-4 py-3 text-center text-green-600">0</td>
                      <td className="px-4 py-3 text-center text-gray-600">0</td>
                      <td className="px-4 py-3 text-center text-red-600">0</td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </div>
        )}

        {activeTab === 'jogos' && (
          <div className="space-y-6">
             <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Calendário de Jogos</h2>
             </div>
             {champ.jogos.length === 0 ? (
                <div className="text-center py-12 text-gray-400">Nenhum jogo gerado. Clique em "Tabela" e depois em "Gerar Tabela".</div>
             ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {champ.jogos.map(game => (
                      <div key={game.id} className="border border-gray-100 rounded-xl p-4 flex items-center justify-between hover:shadow-md transition">
                         <div className="flex-1 text-center font-bold text-gray-700">{game.time_casa_nome}</div>
                         <div className="flex items-center gap-2 px-4">
                            <span className="text-xl font-black bg-gray-100 w-10 h-10 flex items-center justify-center rounded-lg">{game.gols_casa}</span>
                            <span className="text-gray-300 font-bold">x</span>
                            <span className="text-xl font-black bg-gray-100 w-10 h-10 flex items-center justify-center rounded-lg">{game.gols_visitante}</span>
                         </div>
                         <div className="flex-1 text-center font-bold text-gray-700">{game.time_visitante_nome}</div>
                      </div>
                   ))}
                </div>
             )}
          </div>
        )}

        {activeTab === 'times' && (
          <div className="space-y-4">
             <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Times Participantes</h2>
                <button className="text-blue-600 text-sm font-bold flex items-center hover:bg-blue-50 px-3 py-1 rounded-lg transition">
                  <Plus className="w-4 h-4 mr-1" /> Adicionar Time
                </button>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
               {champ.times.map(team => (
                 <div key={team.id} className="p-4 border border-gray-100 rounded-xl flex items-center gap-4 hover:bg-gray-50 cursor-pointer transition">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-black">
                       {team.nome.charAt(0).toUpperCase()}
                    </div>
                    <div className="font-bold text-gray-800">{team.nome}</div>
                 </div>
               ))}
               {champ.times.length === 0 && (
                 <div className="col-span-full py-12 text-center text-gray-400">Nenhum time cadastrado.</div>
               )}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChampionshipDetail;
