import {create} from 'zustand'
//create store
export const useTest=create((set)=>({
    //state
    x:10,
    y:12,
    user:{
        name:"nihas",
        age:21
    },
    //funcctions to modify satatev
    incrementX:()=>set((state)=>({x:state.x+1})),
    decrementX:()=>set((state)=>({x:state.x-1})),
    incrementY:()=>set((state)=>({y:state.y+1})),
    decrementY:()=>set((state)=>({y:state.y-1})),
    incrementXByValue:(v)=>set((state)=>({x:state.x+v})),
    updateUser:()=>set((state)=>({user:{...state.user,age:30}}))
    //name:()=>set(()=>({}))
}))