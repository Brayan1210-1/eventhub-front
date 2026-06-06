import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { adminUserRegisterSchema, type AdminUserRegisterType, type UserRole } from "../schema/adminUser.schema";
import { useCreateUser } from "../hooks/useCreateUser";
import { Button } from "@/design/atoms/button";
import { getApiErrorMessage } from "@/utils/errorController";
import { NotificationToast, type ToastType } from "@/design/molecules/NotificationToast";
import { Input } from "@/design/atoms/input";

export function CreateUserForm() {
    const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<AdminUserRegisterType>({
        resolver: zodResolver(adminUserRegisterSchema),
        defaultValues: { roles: [] }
    });

    const [toast, setToast] = useState<{ message: string, type: ToastType } | null>(null);
    const createUserMutation = useCreateUser();

    const currentRoles = watch("roles");

    const toggleRole = (role: UserRole) => {
        const newRoles = currentRoles.includes(role)
            ? currentRoles.filter(r => r !== role)
            : [...currentRoles, role];
        setValue("roles", newRoles, { shouldValidate: true });
    };

    const onSubmit = (data: AdminUserRegisterType) => {
        createUserMutation.mutate(data, {
            onSuccess: (response) => {

                setToast({ message: response.message || "Usuario creado exitosamente", type: 'success' });
                reset();
            },
            onError: (error) => {
                setToast({ message: getApiErrorMessage(error), type: 'error' });
            }
        });
    };

    const availableRoles: { id: UserRole; label: string; icon: string }[] = [
        { id: 'ADMIN', label: 'Administrador', icon: '🛡️' },
        { id: 'ORGANIZADOR', label: 'Organizador', icon: '🏢' },
        { id: 'VENDEDOR', label: 'Vendedor (Taquilla)', icon: '🎫' },
        { id: 'CLIENTE', label: 'Cliente', icon: '👤' }
    ];

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 animate-in fade-in zoom-in duration-300">
            <div className="mb-8">
                <h2 className="text-2xl font-black text-gray-900">Crear Nuevo Usuario</h2>
                <p className="text-gray-500 mt-1">Registra organizadores, vendedores o personal de logística.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                {/* Selección de Roles */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Roles del Usuario *</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {availableRoles.map(role => {
                            const isSelected = currentRoles.includes(role.id);
                            return (
                                <button
                                    type="button"
                                    key={role.id}
                                    onClick={() => toggleRole(role.id)}
                                    className={`p-4 rounded-xl border-2 text-left transition-all ${isSelected
                                        ? 'border-blue-600 bg-blue-50'
                                        : 'border-gray-200 bg-white hover:border-gray-300'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{role.icon}</span>
                                        <div className="grow">
                                            <p className={`font-bold text-sm ${isSelected ? 'text-blue-900' : 'text-gray-700'}`}>
                                                {role.label}
                                            </p>
                                        </div>
                                        {/* Círculo de Check */}
                                        <div className={`w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'
                                            }`}>
                                            {isSelected && <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                    {errors.roles && <p className="text-red-500 text-xs font-bold mt-2">{errors.roles.message}</p>}
                </div>

                {/* Campos de Texto en 2 Columnas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">

                    <div className="flex flex-col gap-1.5">

                        <Input
                            label="Nombres"
                            {...register("name")}
                            placeholder="Ej: Juan Carlos"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                        />
                        {errors.name && <p className="text-red-500 text-xs font-bold">{errors.name.message}</p>}
                    </div>

                    <div className="flex flex-col gap-1.5">

                        <Input
                            label="Apellidos*"
                            {...register("lastName")}
                            placeholder="Ej: Pérez Gómez"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                        />
                        {errors.lastName && <p className="text-red-500 text-xs font-bold">{errors.lastName.message}</p>}
                    </div>

                    <div className="flex flex-col gap-1.5">

                        <Input
                            label="Documento de Identidad *"
                            {...register("document")}
                            placeholder="Ej: 1020304050"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                        />
                        {errors.document && <p className="text-red-500 text-xs font-bold">{errors.document.message}</p>}
                    </div>

                    <div className="flex flex-col gap-1.5">

                        <Input
                            label="Teléfono"
                            {...register("phone")}
                            placeholder="Ej: 3001234567"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                        />
                        {errors.phone && <p className="text-red-500 text-xs font-bold">{errors.phone.message}</p>}
                    </div>

                    <div className="flex flex-col gap-1.5">

                        <Input
                            label="Correo Electrónico"
                            type="email"
                            {...register("email")}
                            placeholder="usuario@empresa.com"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                        />
                        {errors.email && <p className="text-red-500 text-xs font-bold">{errors.email.message}</p>}
                    </div>

                    <div className="flex flex-col gap-1.5">

                        <Input
                            label="Contraseña temporal"
                            type="text"
                            {...register("password")}
                            placeholder="Mínimo 6 caracteres"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                        />
                        {errors.password && <p className="text-red-500 text-xs font-bold">{errors.password.message}</p>}
                    </div>
                </div>

                <div className="pt-6 border-t border-gray-100 flex justify-end">
                    <Button
                        type="submit"
                        disabled={createUserMutation.isPending}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-200 disabled:opacity-50 transition-all"
                    >
                        {createUserMutation.isPending ? 'Creando usuario...' : 'Crear Usuario'}
                    </Button>
                </div>
            </form>

            {toast && (
                <NotificationToast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
            )}
        </div>
    );
}