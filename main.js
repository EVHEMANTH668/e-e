prediction_1 = "";
prediction_2 = "";

 Webcam.set({
     width:350,
     height:300,
     image_format:"png",
     png_quality:100
 });

camera = document.getElementById("camera");

 Webcam.attach("#camera");

 function snap(){
     Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>'
     })
 }

    console.log('ml5 version : ', ml5.version);

    classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/qqQCknP-e/model.json',modelLoaded);
 

    function modelLoaded(){
        console.log("model loaded")
    }

    function speak(){
        var synth = window.SpeechSynthesis;
        speak_data = "The first prediction is" + prediction_1;
        speak_data_1 = "The second prediction is" + prediction_2;
        var utter_this = new SpeechSynthesisUtterance(speak_data + speak_data_1);
        synth.speak(utter_this);
    }

    function st(){
        img = document.getElementById("captured_image");
        classifier.classify(img, gotResult);
    }

    function gotResult(error , result){
        if(error){
            console.log(error);
        } else {
            console.log(result);
            document.getElementById("result_emotion_name").innerText = result[0].label;
            document.getElementById("result_emotion_name2").innerText = result[1].label;
            prediction_1 = result[0].label;
            prediction_2 = result[1].label;
            speak();
            if (result[0].label == "happy"){
                document.getElementById("update_emoji").innerHTML = "&#128522;";
            }
            if (result[0].label == "sad"){
                document.getElementById("update_emoji").innerHTML = "&#128532;";
            }
            if (result[0].label == "angry"){
                document.getElementById("update_emoji").innerHTML = "&#128548;";
            }
            if (result[1].label == "happy"){
                document.getElementById("update_emoji2").innerHTML = "&#128522;";
            }
            if (result[1].label == "sad"){
                document.getElementById("update_emoji2").innerHTML = "&#128532;";
            }
            if (result[1].label == "angry"){
                document.getElementById("update_emoji2").innerHTML = "&#128548;";
            }
        }

    }