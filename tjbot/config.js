/***************************************************************************
* Copyright 2019 IBM
*
*   Virtual TJBot Nodes for Node-RED
*
*   By JeanCarl Bisson (@dothewww)
*   More info: https://ibm.biz/node-red-contrib-virtual-tjbot
*
*   Licensed under the Apache License, Version 2.0 (the "License");
*   you may not use this file except in compliance with the License.
*   You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
*   Unless required by applicable law or agreed to in writing, software
*   distributed under the License is distributed on an "AS IS" BASIS,
*   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*   See the License for the specific language governing permissions and
*   limitations under the License.
****************************************************************************/

module.exports = function(RED) {
  function vTJBotNodeConfig(config) {
    RED.nodes.createNode(this, config);
    this.botGender = config.botGender;
    this.name = config.name;
    this.services = {};
    this.hardware = [];
    this.name = config.name;

    this.configuration = {
      robot: {
        gender: this.botGender,
        name: this.name
      }
    };

    if(config.hasServo) {
      this.hardware.push("servo");
    }

    if(config.hasLED) {
      this.hardware.push("led");
    }

    if(config.hasSpeaker) {
      this.hardware.push("speaker");
    }

    if(config.hasMicrophone) {
      this.hardware.push("microphone");
    }

    if(config.hasCamera) {
      this.hardware.push("camera");
    }

    if(this.credentials.taApiKey && this.credentials.taApiKey.length) {
      this.services.tone_analyzer = {
        apikey: this.credentials.taApiKey,
        url: config.taUrl
      };
    }

    if(this.credentials.aApiKey && this.credentials.aApiKey.length &&
      this.credentials.aWorkspaceId && this.credentials.aWorkspaceId.length) {
      this.services.assistant = {
        apikey: this.credentials.aApiKey,
        workspaceId: this.credentials.aWorkspaceId,
        url: config.aUrl
      };
    }

    
    if(this.credentials.ltApiKey && this.credentials.ltApiKey.length) {
      this.services.language_translator = {
        apikey: this.credentials.ltApiKey,
        url: config.ltUrl
      };
    }

    if(this.credentials.ttsApiKey && this.credentials.ttsApiKey.length) {
      this.services.text_to_speech = {
        apikey: this.credentials.ttsApiKey,
        url: config.ttsUrl
      };
    }

    this.configuration.speak = {
      language: config.speak
    };

    if(this.credentials.sttApiKey && this.credentials.sttApiKey.length) {
      this.services.speech_to_text = {
        apikey: this.credentials.sttApiKey,
        url: config.sttUrl
      };
    }

    this.configuration.listen = {
      language: config.listen
    };    

    if(this.credentials.vrApiKey && this.credentials.vrApiKey.length) {
      this.services.visual_recognition = {
        apikey: this.credentials.vrApiKey,
        url: config.vrUrl
      };
    }
  }

  RED.nodes.registerType("vtjbot-config", vTJBotNodeConfig, {credentials: {
    taApiKey: {type:"password"},
    aApiKey: {type:"password"},
    aWorkspaceId: {type:"text"},
    ltApiKey: {type:"password"},
    ttsApiKey: {type:"password"},
    sttApiKey: {type:"password"},
    vrApiKey: {type:"password"}
  }});
}
