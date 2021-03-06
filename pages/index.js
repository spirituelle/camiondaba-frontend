import Head from 'next/head'

import Button from './../components/CustomButtons/Button'
import {Col, Row} from 'react-bootstrap'
import {useState, useEffect} from 'react'

import {How, Our} from './../assets/icons/svgr'
export default function Home() {

  const [screenWidth, setScreenWidth] = useState(1);

    useEffect(() => {
        function updateSize() {
            setScreenWidth(window.innerWidth)
        }

        window.addEventListener('resize', updateSize);
        updateSize();

        return () => {
            window.removeEventListener('resize', updateSize)
        }
    }, [])


  return (
    <div >
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
          <Header screenWidth={screenWidth} />
          <Features screenWidth={screenWidth} />
          <HowQuotsWork  screenWidth={screenWidth} />
          <Gagner screenWidth={screenWidth} />
          <Simplicite screenWidth={screenWidth} />
          <WhyUs
           screenWidth={screenWidth} />
      </div>

      
    </div>
  )
}

const Header = () => {
  return(
    <div style= {{backgroundImage: `url("/image/background.svg")`, width: "100%", height: "100vh", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "100% auto"}}>
        <Col>
        <div className="header-text-container">
            <div className="m-0"> 
             <h1 className="accueil-heading"> Service de déménagement </h1>
           </div>
           <div className="m-0">
             <div>
             <p className="accueil-text">  NOUS SOMMES UNE ENTREPRISE DE DÉMÉNAGEMENT PROFESSIONNELLE ET FIABLE QUI FOURNIT DES SERVICES DE DÉMÉNAGEMENT PERSONNALISÉS AUX CLIENTS PARTOUT AU MAROC. </p>

             </div>

           </div>
           <div className="m-0">
             <Button color="primary" className="heading-button"> Obtenez un devis </Button>
           </div>
          </div>


        </Col>
    </div>
  )
}

const Features= () => {


  return(
    <div className="features">
      <div className="header">
        <h1>Pourquoi CamionDaba?</h1>
        <h1> Services de déménagement </h1>

        <p>CamionDaba fournit une large gamme de services liés au déménagement d'articles ménagers et d'effets personnels dans la même ville ou dans une autre ville</p>
      </div>
      <div className="row1-container">
        <div className="box box-down cyan">
          <h3>FLEXIBILITÉ ET PERSONNALISATION</h3>
          <p>Nous avons la réputation d'adapter notre approche et nos solutions pour répondre au mieux aux besoins spécifiques de votre entreprise.</p>
          <img className="feature-img" src="/image/flexibility.png" alt="" />
          {/* https://www.flaticon.com/free-icon/flexibility_2857431?term=flexibility&related_id=2857431 */}
          
        </div>

        <div className="box red">
          <h3>DÉMÉNAGEMENT INTÉGRÉ</h3>
          <p>Nous sommes la seule entreprise de mobilité intégrée à l'échelle natioannale, possédant à la fois des services de relocalisation et de déménagement d'articles ménagers à travers la royaume.</p>
          <img className="feature-img" src="/image/moving.png" alt="" />
           {/* https://www.flaticon.com/free-icon/moving-truck_948717?term=moving&related_id=948717 */}
        </div>

        <div className="box box-down blue">
          <h3>TECHNOLOGIE DE POINTE</h3>
          <p>Nos outils et solutions de pointe améliorent à la fois les procédures et l'expérience dans le processus de relocalisation et de déménagement.</p>
          <img className="feature-img" src="/image/technologie.png" alt="" />
          {/* https://www.flaticon.com/free-icon/project-management_1087815?term=technology&page=1&position=21&page=1&position=21&related_id=1087815&origin=search */}
        </div>
      </div>
      <div className="row2-container">
        <div className="box orange">
          <h3>Assurance</h3>
          <p>En collaboration avec CAMIONDABA, Inc. nous proposons un programme d'assurance transport pour les objets personnels contre tous les risques.</p>
          <img className="feature-img" src="/image/insurance.png" alt="" />
          {/* https://www.flaticon.com/free-icon/insurance_2927067?term=insurence&related_id=2927067 */}
        </div>
      </div>
    </div>
  )
}

const HowQuotsWork = () => {
  return(
    <div>
      <section id="footerCallout_C015_Col00" className="sf_colsIn section-features js-section-features is-active" data-sf-element="Section" data-placeholder-label="Section"><div className="shell-default section__shell"><header className="section__head"><h2 className="section__title title-default">Comment fonctionne notre processus de devis :
        </h2>
 </header>

 <div className="section__body"><div className="features-simple"><div className="features__scroller"></div>

 <div className="features__items"><div className="features__item"><div className="feature-simple"><div className="feature__image"><img src="/image/calculator.png" alt="img" /></div>

 <div className="feature__number"><span>1</span>
 </div>

 <h4 className="feature__title">Demander un devis
                        </h4>

 <div className="feature__entry"><p>Demandez un devis de déménagement gratuit ou Instaquote ci-dessus.</p></div>
 </div>
 </div>
 <div className="features__item"><div className="feature-simple"><div className="feature__image"><img src="/image/checklist.png" alt="img" /></div>
{/* https://www.flaticon.com/free-icon/calculator_735413?term=calculator&related_id=735413&k=1631057587631 */}
 <div className="feature__number"><span>2</span>
 </div>

 <h4 className="feature__title">Fournir des détails
                        </h4>
{/* https://www.flaticon.com/free-icon/checklist_2666469?term=checklist&related_id=2666469 */}
 <div className="feature__entry"><p>Fournissez vos coordonnées et votre date de déménagement idéale afin qu'un spécialiste du déménagement puisse vous contacter.</p></div>
 </div>
 </div>
 <div className="features__item"><div className="feature-simple"><div className="feature__image"><img src="/image/box.png" alt="img" /></div>
{/* https://www.flaticon.com/free-icon/box_679821?term=package&page=1&position=8&page=1&position=8&related_id=679821&origin=search */}
 <div className="feature__number"><span>3</span>
 </div>

 <h4 className="feature__title">Articles spéciaux
                        </h4>

 <div className="feature__entry"><p>Lors de la prise en compte de tout élément spécial, nous fournissons des recommandations qui rendent la budgétisation de votre déménagement plus rentable.</p></div>
 </div>
 {/* https://www.flaticon.com/free-icon/truck_3233997?term=truck&page=1&position=22&page=1&position=22&related_id=3233997&origin=search */}
 </div>
 <div className="features__item"><div className="feature-simple"><div className="feature__image"><img src="/image/truck.png" alt="img" /></div>

 <div className="feature__number"><span>4</span>
 </div>

 <h4 className="feature__title">Frais de déménagement révélés
                        </h4>

 <div className="feature__entry"><p>Enfin, nous fournissons votre coût total de déménagement qui sera plus précis que n'importe quel devis en ligne.</p></div>
 </div>
 </div>
 </div>
 </div>
 </div>
</div>
</section>
    </div>
  )
}


function Gagner(props) {
    

  return (
      <section className="section-content">
          <div className="container yb-card space-below">
              <Row>
                  <Col md="6" className="d-flex flex-column justify-content-center">
                      <div className="home-feature-panel-content">
                          <h2 className="heading  heading-secondary-color">Pourquoi c'est payant d'embaucher des déménageurs professionnels</h2>
                          { props.screenWidth < 767 ?
                              <Col md="6" className="d-flex justify-content-center svg-inside">
                                  {/* <Opgradeordering height="75%" /> */}
                                  {/* <img className="img-fluid" alt="..." src="/image/how1.png" /> */}
                                  <How />
                              </Col>
                              : null
              }
                          <p className="paragraph paragraph-centre-dark"> L'approche do it yourself est très populaire, car elle peut souvent vous faire économiser de l'argent. Mais il est préférable de laisser certaines tâches aux professionnels - et choisir une entreprise professionnelle pour votre déménagement peut en fait être l'option la plus rentable dans de nombreux cas.</p>
                          <p className="paragraph paragraph-centre-dark"> Avec un déménagement professionnel, toutes les dépenses sont couvertes par le coût du déménagement, vous obtenez des déménageurs et des chauffeurs interétatiques professionnels responsables avec qui travailler, et si l'un de vos articles est perdu ou endommagé pendant le transport, c'est l'entreprise de déménagement. responsabilité de faire les choses correctement. Voyez par vous-même et obtenez un devis instantané maintenant.</p>
                          {/* <ul>
                              <li>
                                  Website Ordering
                              </li>
                          </ul> */}
                      </div>
                  </Col>
                  { props.screenWidth > 767 ?
                      <Col md="6" className="d-flex justify-content-center svg-inside">
                          {/* <img className="img-fluid" alt="..." src="/image/how1.png" /> */}
                          <How />
                      </Col>
                      : null
                  }
                  
              </Row>

          </div>
      </section>
  )
}

function WhyUs(props) {
    

  return (
      <section className="section-content">
          <div className="container yb-card space-below">
              <Row>
                  <Col md="6" className="d-flex flex-column justify-content-center">
                      <div className="home-feature-panel-content">
                          <h2 className="heading  heading-secondary-color">Pourquoi nous sommes votre entreprise de déménagement de choix</h2>
                          { props.screenWidth < 767 ?
                              <Col md="6" className="d-flex justify-content-center svg-inside">
                                  {/* <Opgradeordering height="75%" /> */}
                                  <img className="img-fluid our-image" alt="..." src="/image/WhyUs.png" />
                                  {/* <How /> */}
                              </Col>
                              : null
              }
                          <p className="paragraph paragraph-centre-dark"> La différence CamionDaba commence par notre large gamme d'options de déménagement, vous permettant de personnaliser votre déménagement. Même un déménagement principalement de bricolage est plus facile lorsque vous pouvez consulter un spécialiste de la relocalisation professionnel pour savoir quelles fournitures et quelle taille de boîtes vous avez besoin !</p>
                          <p className="paragraph paragraph-centre-dark"> Notre personnel sont également une grande partie de notre succès : chaque employé de CamionDaba se consacre à faire en sorte que votre déménagement se passe en douceur, et vous aurez une équipe de déménageurs professionnels pour vous soutenir à chaque étape du processus. La formation de nos employés met l'accent sur le respect, les soins et l'attention aux détails qui créent les solutions de déménagement personnalisées pour lesquelles nous sommes connus.</p>
                          <p className="paragraph paragraph-centre-dark">Que vous ayez besoin d'un déménagement local ou de services longue distance, d'un chargement et déchargement uniquement, ou d'un déménagement à service complet avec emballage, faire confiance à CamionDaba signifie que vous recevez une solution spécialement adaptée avec les options qui correspondent à vos besoins, gérées par des déménageurs professionnels expérimentés. Contactez-nous dès aujourd'hui au 06 000000 ou utilisez notre formulaire ci-dessus pour obtenir un devis gratuit à la demande personnalisé juste pour vous !</p>
                      </div>
                  </Col>
                  { props.screenWidth > 767 ?
                      <Col md="6" className="d-flex justify-content-center svg-inside">
                          <img className="img-fluid our-image" alt="..." src="/image/WhyUs.png" />
                          {/* <How /> */}
                      </Col>
                      : null
                  }
                  
              </Row>

          </div>
      </section>
  )
}

function Simplicite(props) {
    

  return (
      <section className="section-content">
          <div className="container yb-card space-below">
              <Row>
                  
                  { props.screenWidth > 767 ?
                      <Col md="6" className="d-flex justify-content-center">
                          <img className="img-fluid our-image" alt="..." src="/image/Our.png" />
                      </Col>
                      : null
                  }
                  <Col md="6" className="d-flex flex-column justify-content-center">
                      <div className="home-feature-panel-content">
                          <h2 className="heading  heading-secondary-color">Nos services de déménagement résidentiel</h2>
                          { props.screenWidth < 767 ?
                              <Col md="6" className="d-flex justify-content-center">
                                  <img className="img-fluid our-image" alt="..." src="/image/Our.png" />
                              </Col>
                              : null
              }
                          <p className="paragraph paragraph-centre-dark">Nous encourageons la participation et la contribution de nos clients, car après tout, c'est votre déménagement ! Notre engagement envers la satisfaction du client et notre gamme d'options de déménagement, développées en fonction des besoins et des demandes des clients, sont en grande partie la raison pour laquelle nous avons une note A+ du Better Business Bureau.</p>
                          {/* <ul>
                              <li>
                                  Website Ordering
                              </li>
                          </ul> */}
                          <ul className="list-us">
                            <li>Assistance pour l'auto-emballage (telle que l'aide pour choisir le type et la quantité de boîtes et de fournitures d'emballage nécessaires)</li>
                            <li>Chargement et déchargement</li>
                            <li>Option de stockages</li>
                            <li>Installation et assemblage de meubles et d'appareils électroménagers</li>
                            </ul>
                            <p className="paragraph paragraph-centre-dark">
                            Que vous ayez besoin d'un peu d'aide ou de beaucoup, CamionDaba donne à chacun de nos clients le pouvoir de choisir le niveau d'aide qui correspond à leurs besoins. Et nous faisons tout cela avec des prix prévisibles, vous n'avez donc pas de devis approximatif qui vous donne une mauvaise surprise à la fin de votre déménagement ! Cela vous permet de personnaliser votre déménagement ou votre déménagement en fonction de votre budget et de vos besoins.
                            </p>
                      </div>
                  </Col>
                  
              </Row>

          </div>
      </section>
  )
}
