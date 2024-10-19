import React, { useState } from 'react';
import { Search, GraduationCap } from 'lucide-react';
import Chat from './components/Chat';

interface Course {
  nrc: string;
  asignatura: string;
  profesor: string;
  campus: string;
  horario: string;
  calificacion: number;
}

const courses: Course[] = [
  { nrc: '10001', asignatura: 'Matemáticas I (MAT101)', profesor: 'Juan Pérez', campus: 'Santo Domingo', horario: '08AM a 10AM (Presencial)', calificacion: 5 },
  { nrc: '10002', asignatura: 'Física I (FIS101)', profesor: 'Ana Gómez', campus: 'Santiago', horario: '10AM a 12PM (Presencial)', calificacion: 5 },
  { nrc: '10003', asignatura: 'Química I (QUI101)', profesor: 'Carlos López', campus: 'Santo Domingo', horario: '01PM a 03PM (Online)', calificacion: 5 },
  { nrc: '10004', asignatura: 'Biología (BIO101)', profesor: 'Marta Ruiz', campus: 'Santiago', horario: '03PM a 05PM (Presencial)', calificacion: 5 },
  { nrc: '10005', asignatura: 'Historia (HIS101)', profesor: 'Luis Fernández', campus: 'Santo Domingo', horario: '09AM a 11AM (Online)', calificacion: 5 },
  { nrc: '10006', asignatura: 'Geografía (GEO101)', profesor: 'Sofía Hernández', campus: 'Santiago', horario: '11AM a 01PM (Presencial)', calificacion: 5 },
  { nrc: '10007', asignatura: 'Literatura (LIT101)', profesor: 'Pedro Morales', campus: 'Santo Domingo', horario: '02PM a 04PM (Online)', calificacion: 5 },
  { nrc: '10008', asignatura: 'Economía (ECO101)', profesor: 'Laura Gómez', campus: 'Santiago', horario: '04PM a 06PM (Presencial)', calificacion: 5 },
  { nrc: '10009', asignatura: 'Estadística (EST101)', profesor: 'Ricardo Martínez', campus: 'Santo Domingo', horario: '08AM a 10AM (Online)', calificacion: 5 },
  { nrc: '10010', asignatura: 'Programación I (PROG101)', profesor: 'Elena Torres', campus: 'Santiago', horario: '10AM a 12PM (Presencial)', calificacion: 5 },
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCampus, setSelectedCampus] = useState('Todos los campus');

  const filteredCourses = courses.filter(course => 
    (course.asignatura.toLowerCase().includes(searchTerm.toLowerCase()) ||
     course.profesor.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCampus === 'Todos los campus' || course.campus === selectedCampus)
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <GraduationCap className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Programación Docente UASD 2024-20</h1>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="text-blue-600 hover:text-blue-800">Inicio</a></li>
              <li><a href="#" className="text-blue-600 hover:text-blue-800">Virtual</a></li>
              <li><a href="#" className="text-blue-600 hover:text-blue-800">SemiPresencial</a></li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="relative">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex flex-col sm:flex-row mb-4">
              <div className="relative flex-grow mb-4 sm:mb-0 sm:mr-4">
                <input
                  type="text"
                  placeholder="Buscar Materia o Profesor"
                  className="w-full px-4 py-2 border rounded-md"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <select
                className="px-4 py-2 border rounded-md"
                value={selectedCampus}
                onChange={(e) => setSelectedCampus(e.target.value)}
              >
                <option>Todos los campus</option>
                <option>Santo Domingo</option>
                <option>Santiago</option>
              </select>
            </div>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NRC</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asignatura</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profesor</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campus</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Horario</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Calificación</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCourses.map((course) => (
                      <tr key={course.nrc}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{course.nrc}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.asignatura}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.profesor}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.campus}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.horario}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {'★'.repeat(course.calificacion)}
                          {'☆'.repeat(5 - course.calificacion)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Chat />
      </main>
    </div>
  );
}

export default App;