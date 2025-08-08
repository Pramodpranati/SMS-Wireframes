import React, { useState } from 'react';
import {
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  FileText,
  User,
  Calendar,
  MessageSquare,
  ArrowDown,
  Download
} from 'lucide-react';

interface ApprovalStep {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  status: 'pending' | 'in_progress' | 'approved' | 'rejected';
  completedDate?: string;
  comments?: string;
}

interface AdmissionRequest {
  id: string;
  applicationNumber: string;
  studentName: string;
  className: string;
  submissionDate: string;
  currentStep: number;
  overallStatus: 'pending' | 'approved' | 'rejected';
  approvalSteps: ApprovalStep[];
  studentDetails: {
    fatherName: string;
    motherName: string;
    dateOfBirth: string;
    category: string;
    phoneNumber: string;
    email: string;
  };
}

export default function ApprovalWorkflow() {
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);

  // Mock data - in real app, this would come from your backend
  const [admissionRequests] = useState<AdmissionRequest[]>([
    {
      id: '1',
      applicationNumber: 'ADM2025001',
      studentName: 'Rahul Kumar',
      className: 'Class 9',
      submissionDate: '2024-01-15',
      currentStep: 3,
      overallStatus: 'pending',
      approvalSteps: [
        {
          id: 'initial_review',
          title: 'Initial Review',
          description: 'Basic eligibility and document verification',
          assignedTo: 'Admin Officer',
          status: 'approved',
          completedDate: '2024-01-16',
          comments: 'All basic documents are in order.'
        },
        {
          id: 'document_verification',
          title: 'Document Verification',
          description: 'Detailed verification of certificates and academic records',
          assignedTo: 'Document Verification Officer',
          status: 'approved',
          completedDate: '2024-01-18',
          comments: 'Birth certificate and community certificate verified successfully.'
        },
        {
          id: 'academic_assessment',
          title: 'Academic Assessment',
          description: 'Review of academic records and entrance test results',
          assignedTo: 'Academic Coordinator',
          status: 'in_progress',
          comments: 'Under review by academic committee.'
        },
        {
          id: 'principal_approval',
          title: 'Final Approval',
          description: 'Final approval from school management',
          assignedTo: 'Principal',
          status: 'pending'
        },
        {
          id: 'admission_confirmation',
          title: 'Admission Confirmation',
          description: 'Final admission confirmation and fee collection',
          assignedTo: 'Admission Office',
          status: 'pending'
        }
      ],
      studentDetails: {
        fatherName: 'Suresh Kumar',
        motherName: 'Sunita Kumar',
        dateOfBirth: '2009-03-15',
        category: 'General',
        phoneNumber: '+91 9876543210',
        email: 'rahul.kumar@email.com'
      }
    },
    {
      id: '2',
      applicationNumber: 'ADM2025002',
      studentName: 'Ajith Kumar',
      className: 'Class 6',
      submissionDate: '2024-01-18',
      currentStep: 1,
      overallStatus: 'pending',
      approvalSteps: [
        {
          id: 'initial_review',
          title: 'Initial Review',
          description: 'Basic eligibility and document verification',
          assignedTo: 'Admin Officer',
          status: 'in_progress',
          comments: 'Reviewing submitted documents.'
        },
        {
          id: 'document_verification',
          title: 'Document Verification',
          description: 'Detailed verification of certificates and academic records',
          assignedTo: 'Document Verification Officer',
          status: 'pending'
        },
        {
          id: 'academic_assessment',
          title: 'Academic Assessment',
          description: 'Review of academic records and entrance test results',
          assignedTo: 'Academic Coordinator',
          status: 'pending'
        },
        {
          id: 'principal_approval',
          title: 'Principal Approval',
          description: 'Final approval from school principal',
          assignedTo: 'Principal',
          status: 'pending'
        },
        {
          id: 'admission_confirmation',
          title: 'Admission Confirmation',
          description: 'Final admission confirmation and fee collection',
          assignedTo: 'Admission Office',
          status: 'pending'
        }
      ],
      studentDetails: {
        fatherName: 'Rajesh Sharma',
        motherName: 'Meera Sharma',
        dateOfBirth: '2012-07-22',
        category: 'OBC',
        phoneNumber: '+91 9876543211',
        email: 'priya.sharma@email.com'
      }
    }
  ]);

  const getStepStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-blue-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  // const handleApprovalAction = (stepId: string, action: 'approve' | 'reject') => {
  //   console.log(`${action} step ${stepId} with comment: ${comment}`);
  //   // Here you would typically update the backend
  //   setComment('');
  //   setActionType(null);
  // };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Admission Approval Workflow</h1>
            <p className="text-gray-600">Manage and track admission applications through the approval process</p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Applications List */}
              <div className="lg:col-span-1">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Pending Applications</h2>
                <div className="space-y-3">
                  {admissionRequests.map((request) => (
                    <div
                      key={request.id}
                      onClick={() => setSelectedApplication(request.id)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${selectedApplication === request.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-800">{request.studentName}</h3>
                        <span className="text-xs text-gray-500">{request.applicationNumber}</span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        {request.className} • {request.submissionDate}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          Step {request.currentStep} of {request.approvalSteps.length}
                        </span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(request.currentStep / request.approvalSteps.length) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed View */}
              <div className="lg:col-span-2">
                {selectedApplication ? (
                  <div>
                    {(() => {
                      const request = admissionRequests.find(r => r.id === selectedApplication);
                      if (!request) return null;

                      return (
                        <div>
                          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg mb-6">
                            <h2 className="text-xl font-bold mb-2">{request.studentName}</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="opacity-80">Application #</span>
                                <div className="font-medium">{request.applicationNumber}</div>
                              </div>
                              <div>
                                <span className="opacity-80">Class</span>
                                <div className="font-medium">{request.className}</div>
                              </div>
                              <div>
                                <span className="opacity-80">Father's Name</span>
                                <div className="font-medium">{request.studentDetails.fatherName}</div>
                              </div>
                              <div>
                                <span className="opacity-80">Contact</span>
                                <div className="font-medium">{request.studentDetails.phoneNumber}</div>
                              </div>
                            </div>
                          </div>

                          {/* Approval Steps */}
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800">Approval Progress</h3>

                            {request.approvalSteps.map((step, index) => (
                              <div key={step.id} className="relative">
                                <div className={`border rounded-lg p-4 transition-all duration-200 ${step.status === 'in_progress'
                                  ? 'border-blue-300 bg-blue-50'
                                  : step.status === 'approved'
                                    ? 'border-green-300 bg-green-50'
                                    : step.status === 'rejected'
                                      ? 'border-red-300 bg-red-50'
                                      : 'border-gray-200'
                                  }`}>
                                  <div className="flex items-start justify-between">
                                    <div className="flex items-start space-x-3">
                                      <div className="mt-1">
                                        {getStepStatusIcon(step.status)}
                                      </div>
                                      <div className="flex-1">
                                        <h4 className="font-medium text-gray-800">{step.title}</h4>
                                        <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                                        <div className="flex items-center mt-2 text-sm text-gray-500">
                                          <User className="w-4 h-4 mr-1" />
                                          <span>Assigned to: {step.assignedTo}</span>
                                        </div>
                                        {step.completedDate && (
                                          <div className="flex items-center mt-1 text-sm text-gray-500">
                                            <Calendar className="w-4 h-4 mr-1" />
                                            <span>Completed: {new Date(step.completedDate).toLocaleDateString()}</span>
                                          </div>
                                        )}
                                        {step.comments && (
                                          <div className="mt-2 p-2 bg-white border border-gray-200 rounded text-sm">
                                            <div className="flex items-start">
                                              <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5 mr-2" />
                                              <span className="text-gray-700">{step.comments}</span>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    {step.status === 'in_progress' && (
                                      <div className="ml-4">
                                        <div className="flex space-x-2">
                                          <button
                                            onClick={() => setActionType('approve')}
                                            className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors duration-200"
                                          >
                                            Approve
                                          </button>
                                          <button
                                            onClick={() => setActionType('reject')}
                                            className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors duration-200"
                                          >
                                            Reject
                                          </button>
                                        </div>
                                      </div>
                                    )}
                                  </div>

                                  {actionType && step.status === 'in_progress' && (
                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                      <textarea
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="Add your comments..."
                                        className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        rows={3}
                                      />
                                      <div className="flex justify-end space-x-2 mt-3">
                                        <button
                                          onClick={() => {
                                            setActionType(null);
                                            setComment('');
                                          }}
                                          className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors duration-200"
                                        >
                                          Cancel
                                        </button>
                                        <button
                                          onClick={() => handleApprovalAction(step.id, actionType)}
                                          className={`px-4 py-2 text-white rounded transition-colors duration-200 ${actionType === 'approve'
                                            ? 'bg-green-500 hover:bg-green-600'
                                            : 'bg-red-500 hover:bg-red-600'
                                            }`}
                                        >
                                          Confirm {actionType === 'approve' ? 'Approval' : 'Rejection'}
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </div>

                                {index < request.approvalSteps.length - 1 && (
                                  <div className="flex justify-center my-2">
                                    <ArrowDown className="w-5 h-5 text-gray-400" />
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>

                          {/* Action Buttons */}
                          <div className="mt-6 flex justify-end space-x-3">
                            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                              <Download className="w-4 h-4 mr-2" />
                              Download Application
                            </button>
                            <button className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Send Message
                            </button>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-500 mb-2">Select an Application</h3>
                    <p className="text-gray-400">Choose an application from the left to view approval workflow</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function handleApprovalAction(stepId: string, action: 'approve' | 'reject') {
    console.log(`${action} step ${stepId} with comment: ${comment}`);
    // Here you would typically update the backend
    alert(`Step ${action}d successfully!`);
    setComment('');
    setActionType(null);
  }
}