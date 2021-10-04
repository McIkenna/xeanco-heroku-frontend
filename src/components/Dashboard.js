import React, { Component } from 'react'
import FeatureItem from './Feature/FeatureItem'
import {connect} from "react-redux";
import { getFeatures} from '../actions/FeatureActions';
import { getProducts } from '../actions/ProductActions';
import { getAbouts } from '../actions/AboutActions';
import PropTypes from "prop-types"
import SearchBox from './Layout/SearchBox';
import ProductItem from './Product/ProductItem';
import IntroItem from './Intro/IntroItem';
import { getIntros, deleteIntro, getIntro } from '../actions/IntroActions';
import { getClients } from '../actions/ClientActions';
import { getExtras } from '../actions/ExtraAction';
import ClientItem from './Client/ClientItem';
import ExtraItem from './Extra/ExtraItem';
import styles from './Dashboard.module.css';
import { Carousel , Container} from 'react-bootstrap';
import Loader from './Loader';
import Message from './message';

export class Dashboard extends Component {

    constructor(){
        super()
        this.state = {
            searchValue: ""
        }
    }

componentDidMount(){
   // const {id} = this.props.match.params;
    this.props.getFeatures();
    this.props.getProducts();
    this.props.getAbouts();
    this.props.getIntros();
    this.props.getClients();
    this.props.getExtras();
    //this.props.getFeatureTask();
}

    render() {
        let {features} = this.props.feature;
        let {products, loading} = this.props.product;
        let {intros} = this.props.intro;
        let {clients} = this.props.client;
        let {extras} = this.props.extra;
       const filteredFeature = features.filter(feature => {
           const searchProp = this.state.searchValue.toLocaleLowerCase();
            if(feature.featureHeading.toLowerCase().includes(searchProp) || 
            feature.featureSubHeading.toLowerCase().includes(searchProp) ||
            feature.featureDescription.toLowerCase().includes(searchProp)){
                return feature
            }        
        })

        const filteredProduct = products.filter(product => {
            const searchProduct = this.state.searchValue.toLocaleLowerCase();
             if(product.productName.toLowerCase().includes(searchProduct) || 
             product.productSummary.toLowerCase().includes(searchProduct)
             ){
                 return product
             }
            })

        const onChangeHandler = e => {
            const value = e.target.value
            this.setState ({
                searchValue:value
            })           
        }
        return (
            <div>
                  <main >

{
                    loading ? 
                    <section className="py-5">
                    <Loader />
                    </section>
                       : 
                      <div>
           <section>
                   <div  className={styles.introContainer}>
               <div className={styles.searchBox}>
            <SearchBox 
                value= {this.state.searchValue}
                onChange={onChangeHandler}
                class={styles.searchInput}
                /> 
                </div>
                <div className={styles.introItem} >
               <Carousel >
             
                   {intros.map(intro => (
               <Carousel.Item interval={2000}>
               <IntroItem  key={intro.id} intro={intro}  />
               </Carousel.Item>
               ))}
               
            </Carousel>
            </div>
            </div>
               </section> 
    
               <section className={styles.feature}>{filteredFeature.map(feature => (<FeatureItem key={feature.featureIdentifier} feature={feature} />))}
              </section> 
              
              <section className={styles.prod}> {filteredProduct.map(prod => (<ProductItem key={prod.productIdentifier} product={prod}/>))}
              </section>
               <section className={styles.extra}>
               <Carousel 
               controls={false}
               indicators={false}>
                   {extras.map((extra, index) =>(
                      
                   <Carousel.Item interval={5000}>
                   <ExtraItem key={extra.id} extra = {extra}/>
                   </Carousel.Item>
                   ))}
                   </Carousel>
                   </section>

              <div className={styles.client_container}>
                  <div className={styles.client_col}>
                 
              {clients.map(client => (
                   <div className={styles.client_row}>
              <ClientItem key={client.id} client={client}/>
                  </div>))}
              </div>
              </div>
            
              </div>
    }
    </main>
              </div>
          
           
        )
    }
}

Dashboard.propTypes = {
    feature : PropTypes.object.isRequired,
    getFeatures: PropTypes.func.isRequired,
    getProducts: PropTypes.func.isRequired,
    product : PropTypes.object.isRequired,
    intro: PropTypes.object.isRequired,
    client: PropTypes.object.isRequired,
    getClients: PropTypes.func.isRequired,
    extra: PropTypes.object.isRequired,
    getExtras: PropTypes.func.isRequired

   // featureTask: PropTypes.object.isRequired,
   // getFeatureTask: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    feature: state.feature,
    product: state.product,
    intro: state.intro,
    client: state.client,
    extra: state.extra 
 
   // featureTask: state.featureTask
})
export default connect(mapStateToProps, {getFeatures, getProducts, getAbouts, getIntros, getClients, getExtras})(Dashboard)
