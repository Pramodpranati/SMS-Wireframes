import { CalendarDays, GraduationCap, Plus } from 'lucide-react';
import React, { useState } from 'react';
import { ClassCard } from './ClassCard';
import { AddClassModal } from './AddClassModal';

export interface SpecialClass {
    id: string;
    grade: string;
    section: string;
    subject: string;
    date: string;
    startTime: string;
    endTime: string;
}

export interface SpecialClassFormData {
    grade: string;
    section: string;
    subject: string;
    date: string;
    startTime: string;
    endTime: string;
}

export default function SpecialClassManagement() {
    const [classes, setClasses] = useState<SpecialClass[]>([
        {
            id: '1',
            grade: '10',
            section: 'A',
            subject: 'Advanced Mathematics',
            date: '2024-01-15',
            startTime: '09:00',
            endTime: '10:30',
            
            
        },
        {
            id: '2',
            grade: '9',
            section: 'B',
            subject: 'Science Laboratory',
            date: '2024-01-16',
            startTime: '14:00',
            endTime: '15:30',
            
        },
        {
            id: '3',
            grade: '11',
            section: 'A',
            subject: 'English Literature',
            date: '2024-01-17',
            startTime: '11:00',
            endTime: '12:30',
            
        }
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddClass = (formData: SpecialClassFormData) => {
        const newClass: SpecialClass = {
            id: Date.now().toString(),
            ...formData
        };
        setClasses(prev => [newClass, ...prev]);
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="p-3 bg-indigo-600 rounded-xl">
                            <GraduationCap className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Special Classes</h1>
                            <p className="text-gray-600 mt-1">Manage and schedule special class sessions</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-gray-600">
                            <CalendarDays className="h-5 w-5" />
                            <span className="font-medium">{classes.length} classes scheduled</span>
                        </div>

                        <button
                            onClick={openModal}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            <Plus className="h-5 w-5" />
                            <span>Add New Class</span>
                        </button>
                    </div>
                </div>

                {/* Classes Grid */}
                {classes.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="p-4 bg-gray-100 rounded-full inline-block mb-4">
                            <CalendarDays className="h-12 w-12 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No special classes scheduled</h3>
                        <p className="text-gray-600 mb-6">Get started by adding your first special class session.</p>
                        <button
                            onClick={openModal}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200 inline-flex items-center space-x-2"
                        >
                            <Plus className="h-5 w-5" />
                            <span>Add First Class</span>
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {classes.map((classItem) => (
                            <ClassCard key={classItem.id} classData={classItem} />
                        ))}
                    </div>
                )}

                {/* Add Class Modal */}
                <AddClassModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onSubmit={handleAddClass}
                />
            </div>
        </div>
    );
}