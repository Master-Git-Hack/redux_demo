import { NextResponse } from 'next/server' 
import { IApi } from "@fetch/types"
import api from '@/api'
export async function POST (config:IApi)  {
    try {
        const {data} = await api.post(config);
        return NextResponse.json({...data,message:'¡Operación realizada correctamente!'},{status:200})
    }
    catch (error: any) {
        console.error(error);
        return NextResponse.json({message:'¡Error al hacer la operacion'},{status:500})
    }
    
} 
export async function  GET(config:IApi)   {
    try {
        const {data} = await api.get(config);
        return NextResponse.json({...data,message:'¡Operación realizada correctamente!'},{status:200})
    }
    catch (error: any) {
        console.error(error);
        return NextResponse.json({message:'¡Error al hacer la operacion'},{status:500})
    }
}
export async function PATCH (config:IApi)  {
    try {
        const {data} = await api.patch(config);
        return NextResponse.json({...data,message:'¡Operación realizada correctamente!'},{status:200})
    }
    catch (error: any) {
        console.error(error);
        return NextResponse.json({message:'¡Error al hacer la operacion'},{status:500})
    }
}
export async function DELETE (config:IApi)  {
    try {
        const {data} = await api.delete(config);
        return NextResponse.json({...data,message:'¡Operación realizada correctamente!'},{status:200})
    }
    catch (error: any) {
        console.error(error);
        return NextResponse.json({message:'¡Error al hacer la operacion'},{status:500})
    }
}
