import useActions from "../hooks/useActions"
import useOrders from "../hooks/useOrders"
import usePrototypes from "../hooks/usePrototypes"

import { useMemo } from "react"

export default function Orders(){

    const orders = useOrders()
    const Prototypes = usePrototypes()
    const {remove, removeAll} = useActions()

    const totalPrice = useMemo(()=>{
        return orders.map((order)=>{
            const {id, quantity} = order
            // 아래 연산자 실수 함.
            const prototype = Prototypes.find((p) => p.id === id)
            return prototype.price * quantity
        }).reduce((l,r)=> l+r, 0)
    }, [orders]

    )

    console.log(orders)

    if(orders.length === 0){
    return(
        <aside>
            <div className='empty'>
                <div className='title'>You don't have any orders</div>
                <div className='subtitle'>Click on a + to add an order</div>
            </div>
        </aside>)
    }
    return (
        <aside>
            <div className='order'>
            <div className='body'>
                {orders.map(order=>{
                    
                    const {id} = order
                    const prototype = Prototypes.find((p) => p.id === id)
                    const {thumbnail} = prototype
                    const click = () =>{
                        remove(id)
                    }

                    return <div className='item' key={id}>
                        <div className="img">
                            <video src={thumbnail}/>
                        </div>
                        <div className="content">
                        <p className='title'>
                            {prototype.title}X{order.quantity}
                        </p>
                        </div>
                        <div className="action">
                        <p className='price'>
                            $ {prototype.price * order.quantity}
                        </p>
                        <button className='btn btn--link' onClick={click}> 
                            <i className='icon icon--cross' /> 
                        </button>                            
                        </div>
                    </div>    
                })}
            </div>
            </div>
            <div className = 'total'>
                <hr/>
                <div className='item'>
                    <div className='content'>Total</div>
                    <div className='action'>
                        <div className='price'>${totalPrice}</div>
                    </div>
                    <button className='btn btn--link' onClick={removeAll}>
                        <i className='icon icon--delete'/>
                    </button>
                </div>
                <button className='btn btn--secondary' style={{width:'100%', marginTop:10}} onClick={removeAll}>removeAll</button>
            </div>
        </aside>)

}