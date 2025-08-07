import React, { useState } from 'react';
import { Search, FileText, Calendar, Clock, CheckCircle, XCircle, AlertCircle, Download, Eye, GraduationCap } from 'lucide-react';

interface AdmissionApplication {
  id: string;
  applicationNumber: string;
  studentName: string;
  className: string;
  academicYear: string;
  submissionDate: string;
  status: 'pending' | 'under_review' | 'documents_required' | 'approved' | 'rejected';
  lastUpdated: string;
  remarks?: string;
  documentsSubmitted: {
    birthCertificate: boolean;
    communityCertificate: boolean;
    transferCertificate: boolean;
    photographs: boolean;
    academicRecords: boolean;
  };
}

export default function AdmissionStatus() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data - in real app, this would come from your backend
  const [applications] = useState<AdmissionApplication[]>([
    {
      id: '1',
      applicationNumber: 'ADM2024001',
      studentName: 'Rahul Kumar',
      className: 'Class 9',
      academicYear: '2024-25',
      submissionDate: '2024-01-15',
      status: 'approved',
      lastUpdated: '2024-01-20',
      remarks: 'All documents verified. Admission confirmed.',
      documentsSubmitted: {
        birthCertificate: true,
        communityCertificate: true,
        transferCertificate: true,
        photographs: true,
        academicRecords: true
      }
    },
    {
      id: '2',
      applicationNumber: 'ADM2024002',
      studentName: 'Priya Sharma',
      className: 'Class 6',
      academicYear: '2024-25',
      submissionDate: '2024-01-18',
      status: 'under_review',
      lastUpdated: '2024-01-22',
      remarks: 'Documents under verification by academic committee.',
      documentsSubmitted: {
        birthCertificate: true,
        communityCertificate: false,
        transferCertificate: true,
        photographs: true,
        academicRecords: true
      }
    },
    {
      id: '3',
      applicationNumber: 'ADM2024003',
      studentName: 'Arjun Patel',
      className: 'Class 11',
      academicYear: '2024-25',
      submissionDate: '2024-01-20',
      status: 'documents_required',
      lastUpdated: '2024-01-23',
      remarks: 'Community certificate and transfer certificate pending.',
      documentsSubmitted: {
        birthCertificate: true,
        communityCertificate: false,
        transferCertificate: false,
        photographs: true,
        academicRecords: true
      }
    }
  ]);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          color: 'bg-gray-100 text-gray-800',
          icon: Clock,
          label: 'Pending'
        };
      case 'under_review':
        return {
          color: 'bg-blue-100 text-blue-800',
          icon: AlertCircle,
          label: 'Under Review'
        };
      case 'documents_required':
        return {
          color: 'bg-amber-100 text-amber-800',
          icon: FileText,
          label: 'Documents Required'
        };
      case 'approved':
        return {
          color: 'bg-green-100 text-green-800',
          icon: CheckCircle,
          label: 'Approved'
        };
      case 'rejected':
        return {
          color: 'bg-red-100 text-red-800',
          icon: XCircle,
          label: 'Rejected'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800',
          icon: Clock,
          label: 'Unknown'
        };
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicationNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || app.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Admission Status Dashboard</h1>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by name or application number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
              <div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="under_review">Under Review</option>
                  <option value="documents_required">Documents Required</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid gap-6">
              {filteredApplications.map((application) => {
                const statusConfig = getStatusConfig(application.status);
                const StatusIcon = statusConfig.icon;

                return (
                  <div key={application.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="text-lg font-semibold text-gray-800 mr-3">{application.studentName}</h3>
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusConfig.color}`}>
                            <StatusIcon className="w-4 h-4 mr-1" />
                            {statusConfig.label}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <FileText className="w-4 h-4 mr-2" />
                            <span>App #: {application.applicationNumber}</span>
                          </div>
                          <div className="flex items-center">
                            <GraduationCap className="w-4 h-4 mr-2" />
                            <span>{application.className} - {application.academicYear}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>Submitted: {new Date(application.submissionDate).toLocaleDateString()}</span>
                          </div>
                        </div>

                        {application.remarks && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-700">{application.remarks}</p>
                          </div>
                        )}
                      </div>

                      <div className="mt-4 lg:mt-0 lg:ml-6">
                        <div className="flex flex-col sm:flex-row gap-2">
                          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </button>
                          <button className="inline-flex items-center px-4 py-2 border border-blue-300 rounded-lg text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors duration-200">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Document Submission Status</h4>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                        {Object.entries(application.documentsSubmitted).map(([doc, submitted]) => (
                          <div key={doc} className={`flex items-center text-xs px-2 py-1 rounded ${submitted ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                            {submitted ? (
                              <CheckCircle className="w-3 h-3 mr-1" />
                            ) : (
                              <XCircle className="w-3 h-3 mr-1" />
                            )}
                            <span className="capitalize">{doc.replace(/([A-Z])/g, ' $1').trim()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredApplications.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-500 mb-2">No applications found</h3>
                <p className="text-gray-400">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}