function InputField({ label, type = "text", value, onChange, error, placeholder }){
    return(
        <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">{label}</label>
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
            />
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
}

export default InputField;