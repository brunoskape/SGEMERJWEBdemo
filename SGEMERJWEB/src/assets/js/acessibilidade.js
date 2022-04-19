// JavaScript Document

var fontSize = 0;

var $element = undefined;

function obterTamanhoFonte(elemento) {
  fontSize = parseFloat(elemento.css("font-size"));
  return fontSize;
}

function increasefontSize(elemento) {
  fontSize = obterTamanhoFonte(elemento);
  if (fontSize >= 50) {
    return fontSize;
  }
  return fontSize + 1;
}

function decreasefontSize(elemento) {
  fontSize = obterTamanhoFonte(elemento);
  if (fontSize <= 5) {
    //lower limit
    return fontSize;
  }
  return fontSize - 1;
}

function aumentarTamanhoFonte() {
  $(".altera-fonte").each(function () {
    $(this).css("font-size", increasefontSize($(this)));
  });
}

function diminuirTamanhoFonte() {
  $(".altera-fonte").each(function () {
    $(this).css("font-size", decreasefontSize($(this)));
  });
}

function normalizarTamanhoFonte() {
  $(".altera-fonte").each(function () {
    $(this).css("font-size", "");
  });
}

function AutoContraste() {
  $elemento = $(".altera-contraste");
  TratarContraste($elemento, false);

  $elemento = $(".altera-contraste-destaque");
  TratarContraste($elemento, true);

  //tratando body
  $elemento = $("body");
  if ($elemento.attr("autocontraste") == null) {
    $elemento.css(
      "background-color",
      "black"
    );
    $elemento.attr("autocontraste", "autocontraste");
  } else {
    $elemento.css(
      "background-color",
      ""
    );
    $elemento.attr("autocontraste", null);
  }

  //tratando logotipo principal
  $elemento = $(".logo-principal");
  if ($elemento.attr("autocontraste") == null) {
    $elemento.css(
      "background",
      "url(/assets/images/logo-principal_ac.png) no-repeat"
    );
    $elemento.attr("autocontraste", "autocontraste");
  } else {
    $elemento.css(
      "background",
      "url(/assets/images/logo-principal.png) no-repeat"
    );    
    $elemento.attr("autocontraste", null);
  }
}

function TratarContraste(elemento, destaque) {
  if (elemento.attr("autocontraste") == null) {
    if (destaque) {
      elemento.css({
        cssText:
          "background-color: black !important; color: yellow !important; border-color: yellow !important",
      });
    } else {
      elemento.css({
        cssText:
          "background-color: black !important; color: white !important; border-color: white !important",
      });
    }
    elemento.attr("autocontraste", "autocontraste");
  } else {
    elemento.css({
      cssText: "",
    });
    elemento.attr("autocontraste", null);
  }
}


