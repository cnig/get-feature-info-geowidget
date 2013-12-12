/*
 *     Copyright (c) 2013 CoNWeT Lab., Universidad Politécnica de Madrid
 *     Copyright (c) 2013 IGN - Instituto Geográfico Nacional
 *     Centro Nacional de Información Geográfica
 *     http://www.ign.es/
 *
 *     This file is part of the GeoWidgets Project,
 *
 *     http://conwet.fi.upm.es/geowidgets
 *
 *     Licensed under the GNU General Public License, Version 3.0 (the 
 *     "License"); you may not use this file except in compliance with the 
 *     License.
 *
 *     Unless required by applicable law or agreed to in writing, software
 *     under the License is distributed in the hope that it will be useful, 
 *     but on an "AS IS" BASIS, WITHOUT ANY WARRANTY OR CONDITION,
 *     either express or implied; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 *  
 *     See the GNU General Public License for specific language governing
 *     permissions and limitations under the License.
 *
 *     <http://www.gnu.org/licenses/gpl.txt>.
 *
 */

use("conwet");

conwet.Gadget = Class.create({
    initialize: function() {
        // EzWeb Events
        //this.locationInfoEvent = new conwet.events.Event('location_info_event');
        //this.locationEvent     = new conwet.events.Event('location_event');
        this.linkUrlEvent = new conwet.events.Event('link_url_event');

        this.featureInfoSlot = new conwet.events.Slot('feature_info_slot', function(features) {
            this.setFeatures(features);
        }.bind(this));
    },
    // TODO
    /*sendLocation: function(lon, lat) {
     this.locationEvent.send(lon + ", " + lat);
     },*/

    setFeatures: function(featuresArray) {
       
        var featuresDiv = $('features');        
        
         while (featuresDiv.firstChild) {
            featuresDiv.removeChild(featuresDiv.firstChild);
        }
        
        for (var a = 0; a < featuresArray.length; a++) {
            var feature = featuresArray[a];
            var featureDiv = document.createElement('div');
            featureDiv.id = "info";
            var serviceDiv = document.createElement('div');
            var layerDiv = document.createElement('div');
            var infoDiv = document.createElement('div');            
            serviceDiv.innerHTML = "Service: " + feature.service;
            layerDiv.innerHTML = "Layer: " + feature.layer;
            infoDiv.innerHTML = "Information: \n" + feature.text + "\n";


            var links = infoDiv.getElementsByTagName("a");

            for (var i = links.length - 1; i >= 0; i--) {
                this._replaceLinkElement(links[i]);
            }

            featureDiv.appendChild(serviceDiv);
            featureDiv.appendChild(layerDiv);
            featureDiv.appendChild(infoDiv);
            featuresDiv.appendChild(featureDiv);
        }

    },
    _replaceLinkElement: function(aElement) {
        if (aElement.mailto && (aElement.mailto != "")) {
            return;
        }
        var linkElement = this._createLinkElement(aElement.innerHTML, aElement.href);
        aElement.parentNode.insertBefore(linkElement, aElement);
        aElement.parentNode.removeChild(aElement);
    },
    _createLinkElement: function(value, href) {
        var link = document.createElement("span");
        $(link).addClassName("link");
        link.title = _("Send Event");
        link.appendChild(document.createTextNode(value));
        link.observe("click", function() {
            this.linkUrlEvent.send(href);
        }.bind(this));
        return link;
    },
});
