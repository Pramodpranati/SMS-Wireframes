import { Plus, UserCog } from "lucide-react";
import { useState } from "react";

// Define roles and permissions
const roles = [
    "Department Head",
    "Vice Principal",
    "Principal",
    "Coordinator",
    "Counselor",
    "Librarian",
    "Teacher",
    "Student",
] as const;

const permissions = [
    "View Students",
    "Edit Grades",
    "Manage Attendance",
    "Generate Reports",
    "Manage Schedules",
] as const;

// Type definitions
type Role = typeof roles[number];
type Permission = typeof permissions[number];
type RolePermissions = {
    [key in Role]?: Permission[];
};

export default function RolePermissionManager() {
    const [selectedRole, setSelectedRole] = useState<Role | "">("");
    const [rolePermissions, setRolePermissions] = useState<RolePermissions>({});

    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const role = e.target.value as Role;
        setSelectedRole(role);

        if (!rolePermissions[role]) {
            setRolePermissions((prev) => ({
                ...prev,
                [role]: [],
            }));
        }
    };

    const handlePermissionToggle = (permission: Permission) => {
        if (!selectedRole) return;

        setRolePermissions((prev) => {
            const existing = prev[selectedRole] || [];
            const updated = existing.includes(permission)
                ? existing.filter((p) => p !== permission)
                : [...existing, permission];

            return {
                ...prev,
                [selectedRole]: updated,
            };
        });
    };

    return (
        <div className="mx-auto p-6 border rounded-lg shadow bg-white w-full">
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row items-center space-x-3 mb-6">
                    <UserCog className="w-6 h-6 text-blue-600" />
                    <h2 className="text-lg font-semibold text-gray-800">Designation Permission Manager</h2>
                </div>
                <button className="px-4 py-2 float-end bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add new
                </button>
            </div>

            {/* Role Selector */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Role
                </label>
                <select
                    value={selectedRole}
                    onChange={handleRoleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">-- Select Role --</option>
                    {roles.map((role) => (
                        <option key={role} value={role}>
                            {role}
                        </option>
                    ))}
                </select>
            </div>

            {/* Permissions */}
            {selectedRole && (
                <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">Assign Permissions</h3>
                    <div className="space-y-2">
                        {permissions.map((permission) => (
                            <label key={permission} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={rolePermissions[selectedRole]?.includes(permission)}
                                    onChange={() => handlePermissionToggle(permission)}
                                    className="form-checkbox h-4 w-4 text-blue-600"
                                />
                                <span>{permission}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}

            {/* Display assigned permissions */}
            {selectedRole && (
                <div>
                    <h4 className="text-md font-semibold mb-1">Current Permissions:</h4>
                    <ul className="list-disc list-inside text-gray-700">
                        {(rolePermissions[selectedRole] || []).map((perm) => (
                            <li key={perm}>{perm}</li>
                        ))}
                    </ul>
                </div>
            )}

            <button className="px-4 py-2 mt-4 float-end bg-blue-600 text-white rounded-lg hover:bg-blue-700"            >
                Submit
            </button>
        </div>
    );
}
