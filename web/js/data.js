(function() {
    'use strict';
  
    document.addEventListener('DOMContentLoaded', event => {
      let connectButton = document.querySelector("#connect");
      let sendButton = document.querySelector("#send");
      let valPos = document.querySelector("#valPos");
      let valVolt = document.querySelector("#valVolt");
      let dial = document.querySelector("#dial");
      let statusDisplay = document.querySelector('#status');
      let port;
      let value, valueTradcPos, valueTradcVol;
      function connect() {
        port.connect().then(() => {
          statusDisplay.textContent = '';
          connectButton.textContent = 'Disconnect';
  
          port.onReceive = data => {
            let textDecoder = new TextDecoder();
            value = textDecoder.decode(data) + "";

            if (value.includes("Pos")) {
                valueTradcPos = value.substr(3, value.length - 1);
                //valPos.textContent = valueTradcPos.charCodeAt().toString();
                dial.setAttribute('value', valueTradcPos.charCodeAt().toString());
            } 
            // else if (value.includes("Vol")) {
            //     valueTradcVol = value.substr(3, value.length - 1);
            //     valVolt.textContent = valueTradcVol.charCodeAt().toString()
            // }

          }
          port.onReceiveError = error => {
            console.error(error);
          };

         
        if (port != null)
        {
            let textEncoder = new TextEncoder();
            setInterval(function () { 
                port.send(textEncoder.encode("P")); }, 500);
        }
          
        }, error => {
          statusDisplay.textContent = error;
        });
      }
  
      function onUpdate() {
        if (!port) {
          return;
        }
  
      };
  
      connectButton.addEventListener('click', function() {
        if (port) {
          port.disconnect();
          connectButton.textContent = 'Connect';
          statusDisplay.textContent = '';
          port = null;
        } else {
          serial.requestPort().then(selectedPort => {
            port = selectedPort;
            connect();
          }).catch(error => {
            statusDisplay.textContent = error;
          });
        }
      });
  
      serial.getPorts().then(ports => {
        if (ports.length == 0) {
          statusDisplay.textContent = 'No device found.';
        } else {
          statusDisplay.textContent = 'Connecting...';
          port = ports[0];
          connect();
        }
      });
    });
  })();