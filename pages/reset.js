export default function AuthReset() {
  return (
    <>
      <div className="flex items-center justify-center pt-16 pb-8">
        <p className="font-medium text-2xl">Reset Password</p>
      </div>
      <div className="px-8 space-y-6">
        <div>
          <InputLabel title="Password" />
          <Input />
        </div>
        <div>
          <InputLabel title="Confirm Password" />
          <Input />
        </div>
      </div>
      <div className="px-8 space-y-6 pt-4">
        <div className="flex items-center space-x-2">
          <p className="text-gray-500 text-xs">Show Password</p>
          <input type="checkbox" />
        </div>

        <button className="bg-successGreen rounded w-full text-center text-white h-12 ">
          Reset
        </button>
      </div>
    </>
  );
}

const Input = () => <input className="border rounded w-full h-9" />;
const InputLabel = ({ title }) => (
  <p className="text-gray-500 text-sm">{title}</p>
);
