


var ir_raw_values = new Array();
  /*function readBlob(opt_startByte, opt_stopByte)*/
function readBlob() {

  var files = document.getElementById('files').files;
  if (!files.length) {
    alert('Please select a file!');
    return;
  }

  var file = files[0];
  var start = 0; // parseInt(opt_startByte) || 0;
  var stop = file.size; // parseInt(opt_stopByte) || file.size - 1;




  var reader_visible = new FileReader();

  // If we use onloadend, we need to check the readyState.
  reader_visible.onloadend = function(evt) {
    if (evt.target.readyState == FileReader.DONE) { // DONE == 2
      var inicio_visible_img=[512, 1024, 512]; /* Fix values por tipo_fichero==2 */
      var inicio_visible_ancho=[286, 514, 2930];
      var inicio_visible_alto=[284, 516, 2932];
      var inicio_ir_img=[614998, 615688, 614998];
      var inicio_ir_ancho=[176, 615500, 7984];
      var inicio_ir_alto=[178, 615502, 7986];
      var inicio_fecha_a=[224, 615548, 2937];
      var inicio_fecha_d=[226, 615550, 2936];
      var inicio_fecha_m=[227, 615551, 2937];
      var inicio_fecha_msec=[228, 615552, 2934];
      var tipo_fichero;
      var lectura;
      var char_a, char_b, char_c, char_d, datos_de_inicio;
      var rrr, ggg, bbb;

      lectura=8;
      char_a = evt.target.result.charCodeAt(lectura);
      char_b = evt.target.result.charCodeAt(lectura+1);
      char_c = evt.target.result.charCodeAt(lectura+2);
      char_d = evt.target.result.charCodeAt(lectura+3);
      datos_de_inicio = (char_a << 8) | char_b;
      datos_de_inicio = (datos_de_inicio << 8) | char_c;
      datos_de_inicio = (datos_de_inicio << 8) | char_d;
      if(datos_de_inicio == 983109){ /*65537*/
        tipo_fichero = 0;
      }else if(datos_de_inicio == 1507327){
        tipo_fichero = 1;
      }else{
        tipo_fichero = 1;
      }
      lectura = inicio_ir_ancho[tipo_fichero];//176;
      char_a = evt.target.result.charCodeAt(lectura);
      char_b = evt.target.result.charCodeAt(lectura+1);
      var ancho_ir = (char_a << 8) + char_b;
      lectura = inicio_ir_alto[tipo_fichero];//178;
      char_a = evt.target.result.charCodeAt(lectura);
      char_b = evt.target.result.charCodeAt(lectura+1);
      var alto_ir = (char_a << 8) + char_b;
      //alert("Ancho: " + ancho_ir + "  Alto: " + alto_ir);
      lectura = inicio_fecha_a[tipo_fichero];//224;
      char_a = evt.target.result.charCodeAt(lectura);
      char_b = evt.target.result.charCodeAt(lectura+1);
      var fecha_a = (char_a << 8) + char_b;
      lectura = inicio_fecha_m[tipo_fichero];//226;
      char_a = evt.target.result.charCodeAt(lectura);
      var fecha_m = char_a;
      lectura = inicio_fecha_d[tipo_fichero];//227;
      char_a = evt.target.result.charCodeAt(lectura);
      var fecha_d = char_a;
      lectura = inicio_fecha_msec[tipo_fichero];//228
      char_a = evt.target.result.charCodeAt(lectura);
      char_b = evt.target.result.charCodeAt(lectura+1);
      char_c = evt.target.result.charCodeAt(lectura+2);
      char_d = evt.target.result.charCodeAt(lectura+3);
      var fecha_msec = (char_a << 24) + (char_b << 16) + (char_c << 8) + char_d;
      var fecha_resto = fecha_msec % 3600000;
      fecha_msec -= fecha_resto;
      var fecha_h = fecha_msec / 3600000;
      fecha_msec = fecha_resto;
      fecha_resto = fecha_msec % 60000;
      fecha_msec -= fecha_resto;
      var fecha_min = fecha_msec / 60000;
      fecha_msec = fecha_resto;
      fecha_resto = fecha_msec % 1000;
      fecha_msec -= fecha_resto;
      var fecha_sec = fecha_msec / 1000;
      fecha_msec = fecha_resto;
      lectura = inicio_visible_alto[tipo_fichero];//284;
      char_a = evt.target.result.charCodeAt(lectura);
      char_b = evt.target.result.charCodeAt(lectura+1);
      var alto_visible = (char_a << 8) + char_b;
      lectura = inicio_visible_ancho[tipo_fichero];//286;
      char_a = evt.target.result.charCodeAt(lectura);
      char_b = evt.target.result.charCodeAt(lectura+1);
      var ancho_visible = (char_a << 8) + char_b;
      //alert("Ancho: " + ancho_visible + "   Alto: " + alto_visible + "\nFecha: " + fecha_a + " - " + fecha_m + " - " + fecha_d + "\nHora: " + fecha_h + " : " + fecha_min + " : " + fecha_sec);
      //alert("-" + rrr + "-" + char_a + "-" + bbb + "-" + char_b + "pwnage");
      //alert(fecha_min + "-" + fecha_msec);



      var i;
      var c_visible = document.getElementById("canvas_visible");
      var ctx_visible = c_visible.getContext("2d");
      var imgData_visible = ctx_visible.createImageData(canvas_visible.width, canvas_visible.height);

      lectura=inicio_visible_img[tipo_fichero];
      for (i = 0; i < imgData_visible.data.length; i += 4) {
        char_a = evt.target.result.charCodeAt(lectura);
        char_b = evt.target.result.charCodeAt(lectura+1);
        bbb = (char_b & 31) << 3;
        ggg = ((char_b & 224) >> 3) + ((char_a & 7) << 5);
        rrr = (char_a & 248);
        imgData_visible.data[i+0] = rrr;
        imgData_visible.data[i+1] = ggg;
        imgData_visible.data[i+2] = bbb;
        imgData_visible.data[i+3] = 255;
        lectura += 2;
        if(lectura == 614400+inicio_visible_img[tipo_fichero]){
          lectura = inicio_visible_img[tipo_fichero];
        }
      }
      ctx_visible.putImageData(imgData_visible, 0, 0);



      //var inicio_ir = inicio_ir_img[tipo_fichero];//86 + inicio_visible + 614400;
      var c_ir1 = document.getElementById("canvas_ir1");
      var ctx_ir1 = c_ir1.getContext("2d");
      var imgData_ir1 = ctx_ir1.createImageData(canvas_ir1.width, canvas_ir1.height);
      var ir1_power;
      // Inicializar para conseguir el máximo y el mínimo
      lectura=inicio_ir_img[tipo_fichero];
      char_a = evt.target.result.charCodeAt(lectura);
      char_b = evt.target.result.charCodeAt(lectura+1);
      ir1_power = ((char_a) << 8) + char_b;
      var ir1_power_max = ir1_power;
      var ir1_power_min = ir1_power;
      //alert("Valor: " + ir1_power + "   " + (((char_a) << 8) + char_b));

      lectura=inicio_ir_img[tipo_fichero];;
      for (i = 0; i < imgData_ir1.data.length; i += 4) {
        char_a = evt.target.result.charCodeAt(lectura);
        char_b = evt.target.result.charCodeAt(lectura+1);
        ir1_power = ((char_a & 15) << 4) + (char_b >> 4);
        imgData_ir1.data[i+0] = ir1_power;
        imgData_ir1.data[i+1] = ir1_power;
        imgData_ir1.data[i+2] = ir1_power;
        imgData_ir1.data[i+3] = 255;
        // Máximo y mínimo
        ir1_power = ((char_a) << 8) + char_b;
        if(ir1_power > ir1_power_max){
          ir1_power_max = ir1_power;
        }
        if(ir1_power < ir1_power_min){
          ir1_power_min = ir1_power;
        }
        lectura += 2;
        if(lectura == 38400 + inicio_ir_img[tipo_fichero]){
          lectura = inicio_ir_img[tipo_fichero];
        }
      }

      ctx_ir1.putImageData(imgData_ir1, 0, 0);

      var c_ir2 = document.getElementById("canvas_ir2");
      var c_ir3 = document.getElementById("canvas_ir3");
      var ctx_ir2 = c_ir2.getContext("2d");
      var ctx_ir3 = c_ir3.getContext("2d");
      var imgData_ir2 = ctx_ir2.createImageData(canvas_ir2.width, canvas_ir2.height);
      var imgData_ir3 = ctx_ir3.createImageData(canvas_ir3.width, canvas_ir3.height);
      var ir2_power, ir2_pixel;
      var ir_rango = 2048.0 / (ir1_power_max - ir1_power_min);
      //var ir_rango2 = ir_rango3 / 8;
      var ir_base = ir1_power_min;
      //alert("Máximo: " + ir1_power_max + " Mínimo: " + ir1_power_min + " Rango: " + ir_rango + " Base: " + ir_base);

      lectura=inicio_ir_img[tipo_fichero];
      for (i = 0; i < imgData_ir2.data.length; i += 4) {
        char_a = evt.target.result.charCodeAt(lectura);
        char_b = evt.target.result.charCodeAt(lectura+1);
        //ir2_power = ((char_a) << 8) + char_b;
        ir2_power = char_a * 256 + char_b;
        ir1_power_max = ir2_power;
        ir2_power -= ir_base;
        ir1_power_min = ir2_power;
        ir2_power *= ir_rango;
        ir2_pixel = Math.trunc(ir2_power);
        if(ir2_pixel > 2047){
          /*alert("Valor: " + ir2_pixel);*/
          ir2_pixel=2047;
        }
        if(ir2_pixel < 0){
          ir2_pixel = 0;
        }
        imgData_ir3.data[i+0] = pal_r[ir2_pixel];
        imgData_ir3.data[i+1] = pal_g[ir2_pixel];
        imgData_ir3.data[i+2] = pal_b[ir2_pixel];
        imgData_ir3.data[i+3] = 255;
        ir2_pixel = Math.trunc(ir2_power/8);
        imgData_ir2.data[i+0] = ir2_pixel;
        imgData_ir2.data[i+1] = ir2_pixel;
        imgData_ir2.data[i+2] = ir2_pixel;
        imgData_ir2.data[i+3] = 255;
        lectura += 2;
        if(lectura == 38400 + inicio_ir_img[tipo_fichero]){
          lectura = inicio_ir_img[tipo_fichero];
        }
      }

      ctx_ir2.putImageData(imgData_ir2, 0, 0);
      ctx_ir3.putImageData(imgData_ir3, 0, 0);


      document.getElementById("span_fecha").innerHTML = fecha_a.toString() + " " + fecha_m.toString() + " " + fecha_d.toString();
      document.getElementById("span_hora").innerHTML = fecha_h.toString() + ":" + fecha_min.toString() + ":" + fecha_sec.toString() + "," + fecha_msec.toString();
      document.getElementById("span_visible_x").innerHTML = ancho_visible.toString();
      document.getElementById("span_visible_y").innerHTML = alto_visible.toString();
      document.getElementById("span_ir_x").innerHTML = ancho_ir.toString();
      document.getElementById("span_ir_y").innerHTML = alto_ir.toString();
    }
  };

    //var blob = file.slice(498, 498 + 614400);
    var blob = file.slice(0, file.size); //20480      file.size - 1
    reader_visible.readAsBinaryString(blob);

}


function zoom_canvas(zoom){
  var altura_div_ir = parseInt(document.getElementById("span_ir_y").innerHTML);
  var span_zoom = document.getElementById('span_zoom');
  var escala_actualizada = parseInt(span_zoom.innerHTML) + (zoom == '+' ? 1 : -1);
  if( !isNaN(altura_div_ir) ){
    if(isNaN(escala_actualizada) || escala_actualizada == 0){
      escala_actualizada = 1;
    }
    span_zoom.innerHTML = escala_actualizada;
    var texto_escala = "scale(" + escala_actualizada + ")";
    var separar_div_base=5;
    var separar_div_total = (separar_div_base + altura_div_ir * (escala_actualizada-1) / 2).toString();
    //alert("altura_div_b -" + altura_div_total + "-" + escala_actualizada);
    var canvas_ir3 = document.getElementById('canvas_ir3');
    canvas_ir3.style.transform = texto_escala;
    var div_ir3 = document.getElementById('div_ir3');
    div_ir3.style.paddingTop = separar_div_total + "px";
    div_ir3.style.paddingBottom = separar_div_total + "px";
    var canvas_ir2 = document.getElementById('canvas_ir2');
    canvas_ir2.style.transform = texto_escala;
    var div_ir2 = document.getElementById('div_ir2');
    div_ir2.style.paddingTop = separar_div_total + "px";
    div_ir2.style.paddingBottom = separar_div_total + "px";
    var canvas_ir1 = document.getElementById('canvas_ir1');
    canvas_ir1.style.transform = texto_escala;
    var div_ir1 = document.getElementById('div_ir1');
    div_ir1.style.paddingTop = separar_div_total + "px";
    div_ir1.style.paddingBottom = separar_div_total + "px";
  }
}