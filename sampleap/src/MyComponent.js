import React from 'react'
import ChildComponent from './ChildComponent'
export default class MyComponent extends React.Component
{  
    constructor(props) {
        super(props);
        this.state={
            Open:true,           
            sample:'',
            movies :[],
            ID:'',
            Systems:[]
        }
        this.onclick = this.onclick.bind(this);
       // this.MyComponent = this.MyComponent.bind(this);
   }
   componentWillMount()
   {
       console.log('Parent Component : componentWillMount');    
   }
    componentDidMount() {
    console.log('Parent Component : componentDidMount');
   }
    onclick()
    {
        this.setState({Open:!this.state.Open});
        console.log('Parent Component clicked.');
        console.log('Parent Component '+this.state.Systems);
        const SystemsList = [{ ID:1,SystemTag: 'CLP' }, 
        { ID:2, SystemTag: 'ECDM' },
        { ID:3,SystemTag: 'MSQ' },
        { ID:4,SystemTag: 'POET' },
         {ID:5, SystemTag: 'PQ' }];
         this.setState({Systems:SystemsList});
    }
    // MyComponent()
    // {
    //     const SystemsList = [{ ID:1,SystemTag: 'CLP' }, 
    //     { ID:2, SystemTag: 'ECDM' },
    //     { ID:3,SystemTag: 'MSQ' },
    //     { ID:4,SystemTag: 'POET' },
    //      {ID:5, SystemTag: 'PQ' }];
    //      this.setState({Systems:SystemsList});
    // }
    render(){
       
        return(
            <div>
            <p onClick={this.onclick} style={this.state.Open?Styles.Open:Styles.Close}>
            My Component</p>         
                 {this.state.Systems.map(System=>            
                <ChildComponent onClick={this.onclick.bind(this)} ID={System.ID} SystemName={System.SystemTag}  Open={this.state.Open}>
                 </ChildComponent>
            )
            }
            </div>
        );                 
    }
    componentDidUpdate(prevProps,prevState,snapshot)
    {
        console.log('Parent Component : componentDidUpdate')
    }
    componentWillUnmount()
    {
        console.log('Parent Component : componentWillUnmount')
    }
    
}
const Styles={
              Open:{ 
                 color:'Green',
                 fontSize:30
            },
             Close:{
                color:'Red',
                fontSize:30
  }            
}