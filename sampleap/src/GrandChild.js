import React from 'react'
export default class GrandChild extends React.Component
{
    constructor(props){
        super(props);
        this.state={
            Open:true,           
            csample:'',
            movies :this.props.movies,
            ID:this.props.ID,
            SystemName:this.props.SystemName,
            BatchNames:this.props.BatchNames,
            BatchName:this.props.BatchName
        }
       this.onclick = this.onclick.bind(this);
   }
   componentWillMount()
   {
       console.log('Grand Child Component : componentWillMount');    
   }
   componentDidMount() {
    console.log('Grand Child Component : componentDidMount');
   }
    onclick(SystemName)
    {     
        console.log('Grand Child Component clicked.')
        console.log('Grand clicked.'+this.state.Open)
        console.log('Grand Child ID .'+this.state.ID)
        console.log('data'+this.state.csample)
    }
    render()
    {
        // if (this.props.movies !== this.state.movies){
        //     this.setState({movies : this.props.movies}) //update data from parent if they are different
        //     this.setState({Open:this.props.Open})
        // }
        // if (this.props.ID !== this.state.ID){
        //     this.setState({ID : this.props.ID}) //update data from parent if they are different
        //     this.setState({Open:this.props.Open})
        // }
        
        return(
            <div>
               <h1>{this.state.BatchName}</h1>         
            </div>
        );  
                 
    }
    componentDidUpdate(prevProps,prevState,snapshot)
    {
       
        console.log('Grand Child Component : componentDidUpdate')
    }
    componentWillUnmount()
    {
        console.log('Grand Child Component : componentWillUnmount')
    }
    
}
const Styles={
    Open:{ 
        color:'Green',
        fontSize:30,
       // display:'block'
 },
    Close:{
        color:'Red',
        fontSize:30,
       // display:'none'

}
            
}