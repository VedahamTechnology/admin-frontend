import {

ResponsiveContainer,
LineChart,
Line,
XAxis,
YAxis,
CartesianGrid,
Tooltip

} from "recharts"

const formatCurrency=(value)=>`₹${new Intl.NumberFormat("en-IN").format(value)}`

const tooltipStyle={

backgroundColor:"rgba(255,255,255,0.98)",
border:"1px solid #E2E8F0",
borderRadius:"16px",
boxShadow:"0 20px 40px rgba(15, 23, 42, 0.08)"

}

function RevenueChart(){

const data=[

{
month:"Jan",
revenue:12000
},

{
month:"Feb",
revenue:18000
},

{
month:"Mar",
revenue:15000
},

{
month:"Apr",
revenue:26000
},

{
month:"May",
revenue:22000
},

{
month:"Jun",
revenue:32000
}

]

return(

<ResponsiveContainer

width="100%"

height={360}

>

<LineChart data={data} margin={{top:10,right:8,left:-20,bottom:0}}>

<CartesianGrid stroke="#E2E8F0" strokeDasharray="4 8" vertical={false}/>

<XAxis

dataKey="month"

axisLine={false}

tickLine={false}

tick={{fill:"#64748B",fontSize:12}}

/>

<YAxis

axisLine={false}

tickLine={false}

tick={{fill:"#64748B",fontSize:12}}

tickFormatter={(value)=>`${value/1000}k`}

/>

<Tooltip

formatter={(value)=>[formatCurrency(value),"Revenue"]}

labelStyle={{color:"#031B52",fontWeight:600}}

contentStyle={tooltipStyle}

/>

<Line

type="monotone"

dataKey="revenue"

stroke="#05AFC7"

strokeWidth={4}

dot={false}

activeDot={{r:6,stroke:"#05AFC7",strokeWidth:2,fill:"#fff"}}

strokeLinecap="round"

/>

</LineChart>

</ResponsiveContainer>

)

}

export default RevenueChart