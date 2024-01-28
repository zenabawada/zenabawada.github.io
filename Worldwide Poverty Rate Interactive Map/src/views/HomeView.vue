<script>
import Vue, { onMounted } from "vue";
import VueHead from "vue-head";
import axios from "axios";

Vue.use(VueHead);
//{"IndicatorCode":"SI_POV_DAY1","IndicatorName":"Proportion of population below the international poverty line of US$1.90 per day (%)","Language":"EN"}
export default {
  data() {
    return {
      countriesInit: [],
      info: [],
      countryInfo: [],
      dataReady: false,
    };
  },
  computed: {
    map() {
      let data = this.info;

      let countryDict = {};
      //   let countryDict2 = {};
      let countries = this.countriesInit;

      for (let j = 0; j < data.length; j++) {
        let country;
        let value = data[j].value.numeric;
        let year;
        let id = null;
        let dim = data[j].Dim;
        for (let i = 0; i < dim.length; i++) {
          // console.log(dim.length);
          //let result = data.filter(item => item.Dim[i].category==="COUNTRY");
          //console.log(result)
          if (dim[i].category == "COUNTRY") country = dim[i].code;
          if (dim[i].category == "YEAR") year = parseInt(dim[i].code);
        }
        if (country != null) {
          if (countryDict[country] == null) {
            for (let k = 0; k < countries.length; k++) {
              if (id == null && countries[k].label == country) {
                for (let l = 0; l < countries[k].attr.length; l++) {
                  if (countries[k].attr[l].category == "ISO2") {
                    id = countries[k].attr[l].value;
                    break;
                  }
                }
              }
            }
            countryDict[country] = {
              id: id,
              value: value,
              year: year,
              country: country,
            };
            // countryDict2[country] = { id: id, value: country };
          } else if (countryDict[country].year < year) {
            countryDict[country].value = value;
            countryDict[country].year = year;
          }
        }
      }
      let count = 0;
      for (var key in countryDict) {
        var value = countryDict[key];
        count++;
      }
      let arrayObject = Object.values(countryDict);
      this.info = arrayObject;
      let newData = this.info;
      let scripts = document.querySelectorAll("script");
      // console.log("Scripts: " + scripts.length);
      let toggleData = this.dataReady;

      setTimeout(() => {
        anychart.onDocumentReady(function () {
          let map = anychart.map();
          let preloader = anychart.ui.preloader();
          preloader.render(document.getElementById("container"));

          if (toggleData === true) {
            // console.log(newData);
            // console.log(toggleData);

            // console.log("LOADED");
            map.interactivity().zoomOnMouseWheel(true);
            let zoomController = anychart.ui.zoom();

            //   zoomController.target();
            zoomController.render(map);
            // create choropleth series
            let series = map.choropleth(newData);
            series.tooltip().format((e) => {
              return (
                "Value: " +
                e.getData("value") +
                "%" +
                "\n" +
                "Year: " +
                e.getData("year")
              );
            });
            // set geoIdField to 'id', this field contains in geo data meta properties
            series.geoIdField("id");
            series.labels(true);

            let labels = series.labels();
            labels.fontColor("black");

            series.colorScale(
              anychart.scales.linearColor("#ffbbb9", "#e00000")
            );

            series.hovered().fill("#5ad9b8");
            series.selected().fill();
            // set geo data, you can find this map in our geo maps collection
            // https://cdn.anychart.com/#maps-collection
            map.geoData(anychart.maps["world"]);
            //set map container id (div)
            map.container("container");
            //initiate map drawing
            let colorRange = map.colorRange();
            colorRange.enabled(true);
            colorRange.orientation("right");
            colorRange.length(200);
            map.draw();

            let loaderItem = document.querySelector(".anychart-loader");
            loaderItem.style.display = "none";
            // preloader.visible(false);
          } else if (toggleData === false) {
            preloader.visible(true);
            // console.log(toggleData);
          }
        });
      }, 100);
    },
  },
  head: {
    link: [
      {
        rel: "stylesheet",
        type: "text/css",
        href: "https://cdn.anychart.com/releases/8.11.0/css/anychart-ui.min.css",
      },
      {
        rel: "stylesheet",
        type: "text/css",
        href: "https://cdn.anychart.com/releases/8.11.0/fonts/css/anychart-font.min.css",
      },
    ],
  },
  beforeCreate() {},
  created() {},
  mounted() {
    const fetchData = async () => {
      await axios
        .get("api/gho/athena/api/GHO/SI_POV_DAY1.json", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "POST, GET, PATCH, DELETE",
          },
        })
        .then((response) => {
          this.info = response.data.fact;
          this.countriesInit = response.data.dimension[5].code;
          this.dataReady = true;
        })
        .catch((error) => console.log(error));
    };
    fetchData();
  },
};
</script>

<template>
  <div id="container">
    {{ map }}
  </div>
</template>

<style>
html,
body,
#container {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
