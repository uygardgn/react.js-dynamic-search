// import React, {Component} from "react";
// import tutorialService from "../services/tutorial.service";
// import {Link} from "react-router-dom";
// export default class TutorialsList extends Component {

//     constructor(props)
//     {
//         super(props);
//         this.state = {
//             tutorials:[],
//             currentIndex : -1,
//             currentTutorial : null
//         }

//     }

//     //tutoriallist sayfası çağrıldığında devreye giren fonksiyon
//     componentDidMount() 
//     {
//         this.tutorialllariGetir();
//     }

//     tutorialllariGetir()
//     {
//         tutorialService.getAll().then(tutorialListesi => {
//             console.log(tutorialListesi);
//             this.setState({
//                 tutorials : tutorialListesi.data
//             });
//         }).catch(hata => {
//             console.log("hata oluştu"+hata);
//         })
//     }

//     AktifTutorial(tutorial,index) {
//         this.setState({
//             currentTutorial : tutorial,
//             currentIndex : index
//         })
//     }

//     render() {
//         const {tutorials,currentTutorial,currentIndex}  = this.state
//         return(
//             <div className="list row">
              
//                 <div className="col-md-6">
//                 <h4>Tutorial Listesi</h4>
//                 <ul className="list-group">
//                     {tutorials && tutorials.map((tutorial,index)=>( //tutorials array içindeki her bir elemanı tutorial nesnesi olarak kullandık
//                             <li className={"list-group-item " +(index === currentIndex ? "active" : "")}
//                             onClick={() => this.AktifTutorial(tutorial,index)}
//                             key={index}>
//                                 {tutorial.title}
//                                 </li>
//                     ))}
                   
//                 </ul>
//                 </div>

//                 <div className="col-md-6">
//                    {currentTutorial ? 
//                    (
//                     <div>
//                         <h4>Tutorial</h4>
//                         <div>
//                         <label>
//                             <strong>Başlık : </strong>
//                         </label>{" "}{currentTutorial.title}
//                         </div>
//                         <div>
//                         <label>
//                             <strong>Açıklama : </strong>
//                         </label>{" "}{currentTutorial.description}
//                         </div>
//                         <div>
//                         <label>
//                             <strong>Durum : </strong>
//                         </label>{" "}{currentTutorial.published ? "Yayınlandı " : "Bekleniyor..."}
//                         </div>
//                         <Link to={"/tutorials/"+currentTutorial.id} className="btn btn-success">Düzenle</Link>
//                     </div>
//                    ) :
//                    (
//                    <div></div>
//                    )}
//                 </div>
//              </div>
//         )
        
//     }

// }
import React, { Component } from "react";
import tutorialService from "../services/tutorial.service";
import { Link } from "react-router-dom";

export default class TutorialsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tutorials: [],
      currentIndex: -1,
      currentTutorial: null,
      searchTitle: "", // Arama çubuğu değeri
    };
  }

  componentDidMount() {
    this.tutorialllariGetir();
  }

  tutorialllariGetir() {
    tutorialService
      .getAll()
      .then((tutorialListesi) => {
        this.setState({
          tutorials: tutorialListesi.data,
        });
      })
      .catch((hata) => {
        console.log("hata oluştu" + hata);
      });
  }

  AktifTutorial(tutorial, index) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index,
    });
  }

  onSearchTitleChange = (e) => {
    const searchTitle = e.target.value;
    this.setState({
      searchTitle,
    });
  };

  render() {
    const { tutorials, currentTutorial, currentIndex, searchTitle } =
      this.state;

    const filteredTutorials = tutorials.filter((tutorial) =>
      tutorial.title.toLowerCase().includes(searchTitle.toLowerCase())
    );

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Tutorial Listesi</h4>
          <input
            type="text"
            className="form-control"
            placeholder="Başlık Ara"
            value={searchTitle}
            onChange={this.onSearchTitleChange}
          />
          <ul className="list-group">
            {filteredTutorials.map((tutorial, index) => (
              <li
                className={
                  "list-group-item " +
                  (index === currentIndex ? "active" : "")
                }
                onClick={() => this.AktifTutorial(tutorial, index)}
                key={index}
              >
                {tutorial.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-md-6">
          {currentTutorial ? (
            <div>
              <h4>Tutorial</h4>
              <div>
                <label>
                  <strong>Başlık : </strong>
                </label>{" "}
                {currentTutorial.title}
              </div>
              <div>
                <label>
                  <strong>Açıklama : </strong>
                </label>{" "}
                {currentTutorial.description}
              </div>
              <div>
                <label>
                  <strong>Durum : </strong>
                </label>{" "}
                {currentTutorial.published ? "Yayınlandı " : "Bekleniyor..."}
              </div>
              <Link
                to={"/tutorials/" + currentTutorial.id}
                className="btn btn-success"
              >
                Düzenle
              </Link>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  }
}