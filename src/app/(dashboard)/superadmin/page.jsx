import FormPage from "./forms/FormPage";

// app/superadmin/page.jsx
export default function SuperAdminDashboard() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 dark:bg-[#1D1F24] bg-[#ffffff]">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-5 capitalize px-3 pt-4">
          Form Page
        </h3>
        <FormPage />
      </div>
    </div>
  );
}
