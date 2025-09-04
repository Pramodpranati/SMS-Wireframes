export interface Branch {
  id: string;
  name: string;
  code: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  principal: string;
  studentCount: number;
  teacherCount: number;
  status: 'active' | 'inactive';
  establishedYear: number;
  affiliation: string;
  type: 'primary' | 'secondary' | 'higher_secondary' | 'all';
}

export interface BranchFormData {
  name: string;
  code: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  principal: string;
  studentCount: number;
  teacherCount: number;
  status: 'active' | 'inactive';
  establishedYear: number;
  affiliation: string;
  type: 'primary' | 'secondary' | 'higher_secondary' | 'all';
}