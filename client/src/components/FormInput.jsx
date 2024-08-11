const FormInput = ({ name, type = "text", placeholder, value, onChange, error, required }) => (
    <div className="mb-4">
        <label htmlFor={name} className="block text-gray-700 text-sm font-semibold mb-2">
            {name.replace(/([A-Z])/g, ' $1').trim()}
            {required && <span className="text-red-500">*</span>}
        </label>
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            className={`w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ${error ? 'border-red-500' : ''}`}
            value={value}
            onChange={onChange}
            required={required}
        />
        {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
    </div>
);

export default FormInput;
