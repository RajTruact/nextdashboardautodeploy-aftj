import FormPage from "./forms/FormPage";

// app/superadmin/page.jsx
export default function SuperAdminDashboard() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12">
        <h1 className="text-md font-bold text-gray-900 dark:text-white mb-2">
          Form Page
        </h1>
        <FormPage />
       
      </div>
    </div>
  );
}
