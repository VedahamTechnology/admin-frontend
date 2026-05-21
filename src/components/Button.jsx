function Button({

loading,
text

}){

return(

<button

disabled={loading}

className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-2xl font-semibold hover:opacity-90 duration-300 disabled:opacity-60"

>

{

loading

?

"Signing In..."

:

text

}

</button>

)

}

export default Button