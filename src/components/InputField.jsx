function InputField({

icon:Icon,
type,
placeholder,
value,
onChange,
rightIcon

}){

return(

<div className="relative mb-6">

{

Icon&&

<Icon
className="absolute left-5 top-5 text-slate-400"
/>

}

<input

type={type}

placeholder={placeholder}

value={value}

onChange={onChange}

className="w-full border border-slate-200 rounded-2xl py-4 pl-14 pr-14 outline-none focus:ring-2 focus:ring-cyan-500"

/>

{rightIcon}

</div>

)

}

export default InputField