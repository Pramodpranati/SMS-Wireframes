import { useState } from 'react';

function TeacherTimetable() {
    // Mock substitute teachers (free periods)
    const substituteTeachers = ['Mr. Alan', 'Ms. Emma', 'Mr. Leo'];

    // Define your DAYS and TIME_SLOTS
    const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    const TIME_SLOTS = [
        { id: 1, startTime: '8:00 AM', endTime: '8:45 AM', type: 'period', periodNumber: 1 },
        { id: 2, startTime: '8:45 AM', endTime: '9:30 AM', type: 'period', periodNumber: 2 },
        { id: 3, startTime: '9:30 AM', endTime: '9:45 AM', type: 'break' },
        { id: 4, startTime: '9:45 AM', endTime: '10:30 AM', type: 'period', periodNumber: 3 },
        { id: 5, startTime: '10:30 AM', endTime: '11:15 AM', type: 'period', periodNumber: 4 },
        { id: 6, startTime: '11:15 AM', endTime: '12:00 PM', type: 'lunch' },
        { id: 7, startTime: '12:00 PM', endTime: '12:45 PM', type: 'period', periodNumber: 5 },
        // Add more slots as needed
    ];

    return (
        <table className="w-full border border-gray-200 rounded-md text-sm">
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Time</th>
                    {DAYS.map(day => (
                        <th key={day} className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">
                            {day}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {TIME_SLOTS.map(slot => (
                    <tr key={slot.id}>
                        <td className="px-4 py-3 whitespace-nowrap">
                            <div className="font-medium text-gray-900">
                                {slot.startTime} - {slot.endTime}
                            </div>
                            <div className="text-xs text-gray-500">
                                {slot.type === 'period' && `Period ${slot.periodNumber}`}
                                {slot.type === 'break' && 'Break'}
                                {slot.type === 'lunch' && 'Lunch'}
                            </div>
                        </td>
                        {DAYS.map(day => {
                            if (slot.type !== 'period') {
                                return (
                                    <td key={day} className="px-4 py-3 text-center">
                                        <div className="text-sm text-gray-500 bg-gray-100 rounded px-2 py-1">
                                            {slot.type === 'break' ? 'Break' : 'Lunch'}
                                        </div>
                                    </td>
                                );
                            }

                            return (
                                <td key={day} className="px-2 py-2 text-center">
                                    <div className="flex justify-center">
                                        <select className="w-32 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
                                            <option value="">+</option>
                                            {substituteTeachers.map(sub => (
                                                <option key={sub} value={sub}>
                                                    {sub}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TeacherTimetable;
