<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Konfigurator</title>
    <!-- <script src="https://requirejs.org/docs/release/2.3.5/minified/require.js"></script> -->
    <!-- <script src="js/require.js"></script> -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css" integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="https://code.jquery.com/jquery-3.6.0.js" crossorigin="anonymous"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous" />
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="./css/form.css" />

    <!-- <script src="//cdn.rawgit.com/mrdoob/three.js/master/build/three.js"></script> -->
    <!-- <script src="//cdn.rawgit.com/mrdoob/three.js/master/examples/js/controls/OrbitControls.js"></script> -->

    <!-- <script src="js/orbit.js"></script> -->
    <link rel="stylesheet" href="./css/main.css" />

    <link rel="stylesheet" href="./css/swiper.css" />


    <script src="./js/Tween.min.js"></script>
    <script type="module" src="./js/dynamic.js"></script>
    <script type="module" src="./js/main.js"></script>
    <script type="module" src="./js/summary.js"></script>
    <script src="./js/swiper.js"></script>
</head>


<body>
    <div class="tooltip">
        <p class="tooltipText">test</p>
        <!-- <i class="fas fa-chevron-down"></i> -->
        <div class="arrowBubbleBox"></div>
    </div>

    <!-- <span class="info" data-bs-toggle="tooltip" data-bs-placement="top" title="Some Information"></span> -->

    <div class="mainContent">
        <div class="mainContentInner">
            <div class="confContainer">
                <div class="menu list-group float-start" id="list-example">
                    <!-- <a href="#scroll-section-1" class="menuItem list-group-item list-group-item-action">
                        <div>
                            <div class="menu-icon menu-icon-ruler"></div>
                            <p>Form</p>
                        </div>
                    </a>


                    <a href="#scroll-section-2" class="menuItem list-group-item list-group-item-action">
                        <div>
                            <div class="menu-icon menu-icon-can"></div>
                            <p>Farbe</p>
                        </div>
                    </a>


                    <a href="#scroll-section-3" class="menuItem list-group-item list-group-item-action">
                        <div>
                            <div class="menu-icon menu-icon-link"></div>
                            <p>Optionen</p>
                        </div>
                    </a>

                    <a href="#scroll-section-4" class="menuItem list-group-item list-group-item-action">
                        <div>
                            <div class="menu-icon menu-icon-env"></div>
                            <p>Umgebung</p>
                        </div>
                    </a> -->
                </div>

                <!-- 
                    <a href="#sec3" class="menuItem list-group-item list-group-item-action">
                        <img src="./img/external-link-alt-solid.svg" alt="">
                        <p>Ausstattung</p>
                    </a>
                    <a href="#sec4" class="menuItem list-group-item list-group-item-action">
                        <img src="./img/external-link-alt-solid.svg" alt="">
                        <p>Umgebung</p>
                    </a>
					-->

                <div class="openMenu">
                    <div>
                        <i class="fas fa-chevron-right"></i>
                    </div>
                </div>

                <div class="blurBG"></div>

                <div class="closeMenu-mobile">
                    <div>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                </div>

                <div id="OptionList" class="menu-option">
                    <div class="closeMenu">
                        <div>
                            <i class="fas fa-chevron-left"></i>
                        </div>
                    </div>

                    <!-- <div id="click-stoffbahnen-toggle">click-stoffbahnen-toggle</div> -->
                    <!-- <div id="click-terrassendachmainmaterial-gebuerstet">click-terrassendachmainmaterial-gebuerstet</div> -->
                    <!-- <div id="click-terrassendachmainmaterial-glatt">click-terrassendachmainmaterial-glatt</div> -->

                    <div class="opt-item" id="sec15">
                        <h3>Eigenes Bild hochladen</h3>
                        <div class="kat-wrapper">
                            <div class="kat-item fullWidth">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-12 col-sm-12 mt-3 mt-sm-0 p-0">
                                            <a href="#" id="imageUploaderPre" class="btn btn-secondary">Bild Hochladen</a>
                                        </div>

                                        <div class="col-12 p-0">
                                            <div class="userImageModeVisible">
                                                <div class="col-12 col-sm-12 mt-3 mt-sm-3 p-0">
                                                    <a href="#" id="imagedelete" class="btn btn-link">Bild entfernen</a>
                                                </div>

                                                <div class="col-12">
                                                    <input
                                                        style="display: none"
                                                        id="userImage"
                                                        type="file" />
                                                </div>
                                                <div class="col-12 userImageLoadedVisible">
                                                    <div
                                                        class="col-12 col-sm-4 justify-content-center align-items-center d-flex">
                                                        <p class="text-bold heading text-left">Zoom</p>
                                                    </div>
                                                    <div
                                                        class="col-12 col-sm-8 justify-content-center align-items-center d-flex">
                                                        <input
                                                            class="w-100"
                                                            type="range"
                                                            min="100"
                                                            max="200"
                                                            step="1"
                                                            value="100"
                                                            id="ui-userimage-x" />
                                                    </div>
                                                </div>

                                                <div class="col-12 userImageLoadedVisible">
                                                    <div
                                                        class="col-12 col-sm-4 justify-content-center align-items-center d-flex">
                                                        <p class="text-bold heading text-left">
                                                            Sichtfeld
                                                        </p>
                                                    </div>
                                                    <div
                                                        class="col-12 col-sm-8 justify-content-center align-items-center d-flex">
                                                        <input
                                                            class="w-100"
                                                            type="range"
                                                            min="30"
                                                            max="90"
                                                            step="1"
                                                            value="40"
                                                            id="ui-fov-slider" />
                                                    </div>
                                                </div>

                                                <!-- <div
                            class="row userImageLoadedVisible text-center mt-3"
                          > -->
                                                <!-- <div class="col-12 col-sm-6 mt-3 mt-sm-0">
                              <a
                                href="#"
                                id="ui-toggle-userimagehelper"
                                class="btn btn-outline-secondary"
                                >Toggle Helper Lines</a
                              >
                            </div> -->
                                                <!-- <div class="col-12 col-sm-6">
                              <a
                                href="#"
                                id="ui-takeScreenshot"
                                class="btn btn-outline-secondary"
                                >Screenshot</a
                              >
                            </div> -->
                                                <!-- </div> -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="opt-item opt-item-last" id="sec15">
                        <h3>Ihre Konfiguration</h3>
                        <div class="kat-wrapper">
                            <div class="kat-item fullWidth">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-12 col-sm-12 g-0 mb-3 centerElement">
                                            <p class="w-100 text-start">
                                                Gesamtpreis: <span class="sumText">22.000 ???</span>
                                            </p>
                                            <p class="discText text-start w-100">
                                                Sie sparen: 2.768 ???
                                            </p>
                                            <!-- <a href="" class="btn btn-primary mt-2">Angebot anfordern</a> -->
                                        </div>

                                        <div class="col-12 col-sm-6 mt-3 mt-sm-0 p-0">
                                            <a class="btn btn-secondary-menu config-link">Zusammenfassung</a>
                                        </div>
                                        <div class="col-12 col-sm-6 mt-3 mt-sm-0 p-0 centerElement text-center">
                                            <!-- <p>Sparen sie bis zu 20%</p> -->
                                            <a class="btn btn-primary btn_angebotAnfordernSmall">Angebot anfordern</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="mt-3">
								<a
									class="btn btn-primary config-link"
									>Zusammenfassung</a
								>
							</div> -->
                        <!-- <div class=" ">
								<a
									class="w-100 w-sm-50 d-block ps-sm-0 text-center text-sm-start config-link"
									>Infomaterial</a
								>
							</div> -->
                    </div>

                    <div class="bottomElement">
                        <div class="container">
                            <div class="row">
                                <div class="col-6 centerElement">
                                    <p class="w-100 text-start ps-3">
                                        Gesamtpreis: <span class="sumText">22.000 ???</span>
                                    </p>
                                    <p class="discText text-start ps-3 w-100">
                                        Sie sparen: 2.768 ???
                                    </p>
                                    <!-- <a href="" class="btn btn-primary mt-2">Angebot anfordern</a> -->
                                </div>
                                <div class="col-6 centerElement text-center">
                                    <!-- <p>Sparen sie bis zu 20%</p> -->
                                    <a class="btn btn-primary btn_angebotAnfordernBig">Angebot anfordern</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- <div class="visual float-end d-none d-lg-block"> -->
                <div class="visual float-end">
                    <div id="gui_container"></div>

                    <div class="visual-topContent">
                        <!-- <div class="bgFade"></div> -->
                        <div class="container-fluid h-100">
                            <div class="row h-100">
                                <div class="col-4"></div>
                                <div class="col-4 h-100 Logo-fix">
                                    <div class="logoContainer h-100 Logo-fix"></div>
                                </div>
                                <div class="col-4 h-100 hide-on-mobile">
                                    <div class="row">
                                        <div class="col-4 h-100"></div>
                                        <div class="col-8 h-100">
                                            <a
                                                id="tb_indi_plan"
                                                class="btn btn-secondary tb-individual"
                                                href="#">Individuelle Planung</a>
                                            <a
                                                class="btn btn-secondary tb-kontakt">Kontakt</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="visual-mainContent">
                        <div id="treeLoadingContainer" class="treeLoadingContainer">
                            <div class="preloadFilter"></div>
                            <div class="container">
                                <div class="row justify-content-center">
                                    <div
                                        class="col-6 offset-3 d-flex flex-column justify-content-center align-items-center vh-100">
                                        <div class="loadingText text-center">
                                            <i class="fas fa-circle-notch fa-spin"></i><br />
                                            &nbsp;&nbsp;&nbsp;Lade ...
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div id="treeLoadingContainer2" class="treeLoadingContainer2">
                            <div class="preloadFilter"></div>
                            <div class="container">
                                <div class="row justify-content-center">
                                    <div
                                        class="col-6 offset-3 d-flex flex-column justify-content-center align-items-center vh-100">

                                    </div>
                                </div>
                            </div>
                        </div>



                        <div id="threecontainer"></div>
                        <div id="ThreeOverlay">
                            <div class="wrappercontai">
                                <div class="wrapper5by4">
                                    <div class="innerCont">
                                        <img id="tz_img" src="./img/tz_glatt.svg" alt="" />
                                        <p class="outputRoofDepth">1100</p>
                                        <p class="outputMaxRoofHeight">1100</p>
                                        <p class="outputRoofHeight">1100</p>
                                        <p class="outputDurchgangsHeight">1100</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- <div style=" position: absolute; z-index: 100; left: 500px; bottom: 0; right: 0; height: 50px; background-color: rgba(0, 0, 0, 0.33); color: #fff; display: block; " > -->
                        <!--
					<button id="Cam1">Cam1</button>
					<button id="Cam2">Cam2</button>
					<button id="Farbe1">Farbe1</button>
					<button id="Farbe2">Farbe2</button>
					<button id="Farbe3">Farbe3</button>
					-->
                        <!-- <div style="display: inline-block; width: 400px"> -->
                        <!-- <input type="range" min="200" max="260" value="235" class="slider" id="testHeightSlider" /> -->
                        <!-- </div> -->
                        <!-- </div> -->
                    </div>

                    <div
                        id="userImageControlsContainer"
                        class="userImageControlsContainer">
                        <div class="imgUploadContainer2">
                            <a id="enableUserImageMode" class="icon_imgUpload"></a>
                            <a id="disableUserImageMode" class="icon_imgUpload"></a>
                        </div>
                    </div>

                    <!-- <div class="zoomRangeSliderContainer">
                        <div class="closeMenu_zoomSlider">
                            <div>
                                <i class="fas fa-chevron-down"></i>
                            </div>
                        </div>
                        <label>FOV <input class="w-100" type="range" min="30" max="90" step="1" value="40" id="ui-fov-slider"></label>
                        <label>Bild Zoom <input class="w-100" type="range" min="100" max="200" step="1" value="100" id="ui-userimage-x"></label>
                    </div>


                    <div class="imgUploadContainer">
                        <div class="closeMenu_imgUpload">
                            <div>
                                <i class="fas fa-chevron-down"></i>
                            </div>
                        </div>
                        <div class="iconContDiv">
                            <span id="enableUserImageMode" class="icon_imgUpload"></span>
                        </div>
                        <div class="iconContDiv">
                            <span id="enableUserImageMode" class="icon_imgUpload"></span>
                        </div>
                        <div class="iconContDiv">
                            <span id="enableUserImageMode" class="icon_imgUpload"></span>
                        </div>
                        <div id="enableUserImageZoomSettings" class="iconContDiv">
                            <span id="enableUserImageMode" class="icon_imgUpload"></span>
                        </div>
                         <div class="rangeSliderContainer">
                            <input type="range" name="" id="">
                            <input type="range" name="" id="">
                        </div> -->
                </div>

                <div class="iconContDivainer-other">
                    <!-- <div id="enableUserImageMode_cont" class="iconContDiv ">
                            <span id="enableUserImageMode_Pre" class="icon_imgUpload"></span>
                        </div> -->
                    <div class="iconContDiv icon-size-container centerTT">
                        <span id="btn_showDimensions" class="icon-size"></span>
                    </div>

                    <div class="iconContDiv icon-info-container centerTT">
                        <span id="btn_showDimensionInfo" class="icon-info"></span>
                    </div>

                    <div class="iconContDiv icon-plus-container centerTT">
                        <span id="btn_zoomIn" class="icon-plus"></span>
                    </div>
                    <div class="iconContDiv icon-minus-container centerTT">
                        <span id="btn_zoomOut" class="icon-minus"></span>
                    </div>
                    <div class="iconContDiv icon-outer-container centerTT">
                        <span class="icon-outer" id="click-campositionbtn-1"></span>
                    </div>
                    <div class="iconContDiv icon-inner-container centerTT">
                        <span class="icon-inner" id="click-campositionbtn-2"></span>
                    </div>

                    <!-- <div>
					<span class="icon-undo"></span>
				</div> -->
                    <!-- <div>
					<span class="icon-redo"></span>
				</div> -->
                    <!-- <div>
					<span class="icon-save"></span>
				</div>
				<div>
					<span class="icon-user"></span>
				</div> -->
                </div>
            </div>
        </div>

        <div class="modalOption">
            <div class="blackOut"></div>
            <div class="modalContent">
                <div class="container-fluid">
                    <div class="row mt-5">
                        <div class="col-12 col-sm-6">
                            <div class="visualBox">
                                <img id="modalOptionBox_img" src="./img/conf/dacherweiterung.jpg" alt="" />
                            </div>
                        </div>
                        <div class="col-12 col-sm-6">
                            <h3 id="modalOptionBox_headline" class="mt-3 mt-sm-0">
                                Glatter Wandanschluss
                            </h3>
                            <p id="modalOptionBox_text" class="mt-4">
                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam era
                            </p>
                            <div class="col-12 mt-5">
                                <a value="" id="modalOptionBox_btn" class="btn btn-primary">Hinzuf??gen</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="closeBtn-modal"></div>
            </div>
        </div>


        <?php

include("./content/customplan.php");
include("./content/contact.php");
include("./content/summary.php");
include("./content/request.php");
include("./content/info.php");

?>


        <!-- <div class="modalOption2">
				<div class="blackOut"></div>
				<div class="modalContent">
					<div class="container-fluid">
						<div class="row mt-5">
							<div class="col-12 col-sm-6 overflow-hidden">
 <div class="swiper">
                                    <div class="swiper-wrapper">
                                        <div class="swiper-slide">
                                        <div class="visualBox">
                                            <img
                                                id="modalOptionBox_img"
                                                src="https://mcrcp.mcrobots.slxhost.de/images/product/MADEROS-Glashaus-15_60883210cf70b.jpg"
                                                alt=""
                                            />
                                        </div>
                                        </div>
                                        <div class="swiper-slide">
                                            								<div class="visualBox">
									<img
										id="modalOptionBox_img"
										src="https://mcrcp.mcrobots.slxhost.de/images/product/MADEROS-Rosengarten_60b76a4aeddfb.jpg"
										alt=""
									/>
								</div>
                                        </div>
                                        <div class="swiper-slide">
                                            								<div class="visualBox">
									<img
										id="modalOptionBox_img"
										src="https://mcrcp.mcrobots.slxhost.de/images/product/MADEROS-Glashaus_60c0c124e13f0.jpg"
										alt=""
									/>
								</div>
</div>
                                        <div class="swiper-slide">
                                            								<div class="visualBox">
									<img
										id="modalOptionBox_img"
										src="https://mcrcp.mcrobots.slxhost.de/images/product/MADEROS-Terrassendach1_5ed11ca43683f.jpg"
										alt=""
									/>
								</div>
</div>
                                        <div class="swiper-slide">
                                            								<div class="visualBox">
									<img
										id="modalOptionBox_img"
										src="https://mcrcp.mcrobots.slxhost.de/images/product/MADEROS-Terrassendach_5efb5588ea349.jpg"
										alt=""
									/>
								</div>
</div>
                               
                                        </div>
                                        
                                    </div>
   
								
							</div>
							<div class="col-12 col-sm-6">
								<h3 id="modalOptionBox_headline" class="mt-3 mt-sm-0">
									Ihr Dach ist nicht dabei?
								</h3>
								<p id="modalOptionBox_text" class="mt-4">
									Ob schwierige Winkel, ein tiefes Dach oder einfach wenig
									Platz: Wir finden die L??sung, die genau zu Ihrem Haus passt.
									Wir fertigen Terrassend??cher ma??geschneidert nach Ihren
									Vorstellungen. Lassen Sie sich gerne zu Ihrem individuellen
									Bauprojekt von uns beraten.
									
									
								</p>
								<div class="col-12 mt-5"> 
                  <a
                    value=""
                    href="https://www.maderos.de/"
                    id="modalOptionBox_btn"
                    class="btn btn-primary"
                    >Zu Maderos</a
                  >
                </div>
							</div>
						</div>
					</div>

					<div class="closeBtn-modal2"></div>
				</div>
			</div> -->
    </div>

    <!-- <link href="https://fonts.googleapis.com/css2?family=Baloo+Tamma+2&display=swap" rel="stylesheet"> -->



    <!-- <div class="modal_getAllInfo">
			<div class="blackOut"></div>

			<div class="container">
				
						<div class="closeButtonContainer">
							<div class="closeBtn-summaryContainer"></div>
					</div>
	
				
				<div class="content">
					<div class="row">
						<div class="col-12 m-auto">
							 <div class="logoContainer">
				  <img src="./img/logo.svg" alt="" />
				</div> 
	
							<h2 class="mb-4">Ihre Konfiguration 2938182</h2>
							
				
							<div class="row gx-5 mt-4">
								<div class="col-12 m-auto">
	
								</div>
							</div>
	
	
							<div class="row gx-5 mt-3">
								<div class="col-12">
									<div class="row">
										<div class="col-6 previewImage pe-0 ">
											<div class="aspect-container">
												<img src="./img/Preview01.png" alt="" srcset="" />
											</div>
										</div>
	
										<div class="col-6 previewImage pe-0">
											<div class="aspect-container">
												<img src="./img/Preview02.png" alt="" srcset="" />
											</div>
										</div>
									</div>
								</div>
							</div>
	
							<div class="row SummaryContainer"></div>
							<div class="infoText mt-5 mb-5">
								<p>
									Die Lieferzeit betr??gt ca. 3 - 4 Wochen. Alle konfigurierbaren
									Terrassend??cher sind auf eine Schneelast von mindestens sk= 0,65
									kN/m?? (Schneelastzone1) ausgelegt. Bei h??heren Schneelastzonen
									ist ggf. eine statische Anpassung des Dachs notwendig.
								</p>
								<p>
									Die statische Berechnung gilt f??r den privaten Bereich (0,5
									KN/m). Der maximale Pfostenabstand darf 1m nicht ??berschreiten.
									Dies stellt einen unverbindlichen Konfigurationsvorschlag dar.
									Je nach ??rtlichen Begebenheiten oder der Art der
									Zusammenstellung kann es im Auftragsfall zu Abweichungen kommen.
								</p>
								<p>
									Alle Ma??e sind ca. Angaben ohne Gew??hr. Da es sich um
									theoretische Werte handelt, m??ssen bauseits Toleranzen
									einkalkuliert werden.
								</p>
								<p class="befestignungsNotice mt-3">Hinweis: Es gibt verschiedene Mauerwerke - man extra Befestigungsmaterial ben??tigt; </p>
							</div>
						</div>
					</div>
					<div class="row">
						 <div class="col-10 m-auto">
							<div class="row"> 
								<div class="col-6 previewImage">
									<div class="aspect-container">
										<img id="previewImage_tz" src="./img/tz_glatt.svg" alt="" srcset="" />
									</div>
								</div>
	
								<div class="col-3 position-relative previewImage">
									<div class="dimensionInfoBox">
										<div class="row">
											<div class="col-12 m-auto">
												<div class="row previewDimensionTable">
													<div class="col-1 p-0 m-0 "><span class="circleAround">A</span></div>
													<div class="col-7 p-0 ps-1 m-0">Durchgangsh??he:</div>
													<div class="col-4 p-0 m-0 outputRoofDepth text-end">2000mm</div>
												</div>
												<div class="row previewDimensionTable ">
													<div class="col-1 p-0 m-0 "><span class="circleAround">B</span></div>
													<div class="col-7 p-0 ps-1 m-0">Dachh??he:</div>
													<div class="col-4 p-0 m-0 outputRoofHeight text-end">2000mm</div>
												</div>
												<div class="row previewDimensionTable">
													<div class="col-1 p-0 m-0"><span class="circleAround">C</span></div>
													<div class="col-7 p-0 ps-1 m-0">Dachh??he maximal:</div>
													<div class="col-4 p-0 m-0 outputMaxRoofHeight text-end">2000mm</div>
												</div>
												<div class="row previewDimensionTable">
													<div class="col-1 p-0 m-0"><span class="circleAround">D</span></div>
													<div class="col-7 p-0 ps-1 m-0">Dachtiefe:</div>
													<div class="col-4 p-0 m-0 outputRoofDepth text-end">2000mm</div>
												</div>
												
											</div>
										</div>
										<div>A &nbsp;&nbsp; Durchgangsh??he &nbsp;&nbsp;<span class="outputDurchgangsHeight">2000mm</span></div>
										<div>B &nbsp;&nbsp; Dachh??he &nbsp;&nbsp; <span class="outputRoofHeight">2000mm</span></div>
										<div>C &nbsp;&nbsp; Dachh??he maximal &nbsp;&nbsp; <span class="outputMaxRoofHeight">2000mm</span></div>
										<div>D &nbsp;&nbsp; Dachtiefe &nbsp;&nbsp; <span class="outputRoofDepth">2000mm</span></div> 
									</div>
								 </div>
							</div> 
						   
						</div>
						
					</div>
					<div class="row mt-3">
						<div class="col-12  mt-3  p-0 text-center">
							 <p>Sparen sie bis zu 20%</p>
							<a class="btn btn-primary btn_angebotAnfordernSmall">Angebot anfordern</a
								>
							</div>
					</div>
				</div>

			</div>
		</div> -->

    <!-- <div class="modal_contact">
			<div class="blackOut"></div>
            <div class="container">
                    <div class="closeBtn-contactContainer"></div>
                <div class="h5">Kontakt</div>
					<div class="row mb-5">
						<div class="col-7 py-5">
							<div class="wrapper1by1">
								<div class="innerCont">
									<img src="./img/kontakt.jpg" alt="" srcset="" />
								</div>
							</div>
						</div>
						<div class="col-5 p-5 position-relative">
							<div class="innerWrapperKontakt py-5">
								<h3>Maderos GmbH</h3>
								<p>Am Hatzberg 16</p>
								<p>21224 Rosengarten/Nenndorf</p>
								<br />
								<p class="mb-2"><i class="phoneIcon"></i>04108 - 41429-40</p>

								<a class="" href="mailto:info@maderos.de">
									<i class="mailIcon"></i> solido@maderos.de</a
								>
								<br />

								<h4>??ffnungszeiten:</h4>
								<p>Mo. - Fr. 09:00 ??? 18:00 Uhr</p>
								<p>Sa. 10:00 ??? 14:00 Uhr</p>
								<p>So. geschlossen</p>
								<br />
								<br />
								<h6>Anlieferung und Abholung am Lager: Mo-Fr 7 - 15 Uhr</h6>
							</div>
						</div>
					</div>

	

					<div class="row">
						<div class="h5">Ihre Daten</div>
						<div class="col-12 colContent">
							<form
								name="modularform_basicinfo_form"
								class="form-horizontal modularform_basicinfo_form modularform_form"
								method="post"
								action=""
								enctype="multipart/form-data"
							>
								<div class="row">
									<div class="col-12 col-lg-8 offset-lg-2">
										<div class="modularinputgroup cnt4">
											<div class="textinput styled">
												<input
													type="text"
													class="inputtext modularform_input modularform_textinput submiterr"
													id="input_vorname"
													name="input_vorname"
													placeholder="Vorname*"
													value=""
													required=""
												/>
											</div>
											<div class="textinput styled">
												<input
													type="text"
													class="inputtext modularform_input modularform_textinput submiterr"
													id="input_name"
													name="input_name"
													placeholder="Name*"
													value=""
													required=""
												/>
											</div>
											<div class="textinput styled">
												<input
													type="text"
													class="inputtext modularform_input modularform_textinput"
													id="input_strasse"
													name="input_strasse"
													placeholder="Stra??e"
													value=""
												/>
											</div>
											<div class="textinput styled">
												<input
													type="text"
													class="inputtext modularform_input modularform_textinput"
													id="input_hausnummer"
													name="input_hausnummer"
													placeholder="Hausnummer"
													value=""
												/>
											</div>
											<div class="textinput styled">
												<input
													type="text"
													class="inputtext modularform_input modularform_textinput"
													id="input_plzort"
													name="input_plzort"
													placeholder="PLZ, Ort"
													value=""
												/>
											</div>
											<div class="textinput styled">
												<input
													type="text"
													class="inputtext modularform_input modularform_textinput"
													id="input_telefon"
													name="input_telefon"
													placeholder="Telefon"
													value=""
												/>
											</div>
											<div class="textinput styled">
												<input
													type="email"
													class="inputtext modularform_input modularform_textinput submiterr"
													id="input_email"
													name="input_email"
													placeholder="E-Mail*"
													value=""
													required=""
												/>
											</div>
                                            <div class="textinput textAreaInput styled">
												<textarea
													class="inputtext modularform_input modularform_textinput submiterr"
													id="input_freeText"
													name="input_freeText"
													placeholder="Anfrage*"
													value=""
													required=""
												></textarea>
											</div>
										</div>
									</div>
									<div class="col-12 col-lg-8 offset-lg-2 text-end">
										<small class="">*Pflichtfelder</small>
									</div>
									<div class="btnContainer">
										<button type="button" class="btn btn-secondary-menu formstepNext">
											Weiter
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div> -->

    <!-- <div class="modal_anfrage">
                    <div class="blackOut"></div>
            <div class="container">
                    <div class="closeBtn-anfrageContainer"></div>
                     <div class="h5">Angebot anfordern</div>
            <div class="row gx-5 mt-5">
                <div class="col-8 m-auto">
                    <div class="row">
                        <div class="col-6 previewImage">
                            <div class="aspect-container">
                                <img src="./img/Preview01.png" alt="" srcset="" />
                            </div>
                        </div>

                        <div class="col-6 previewImage">
                            <div class="aspect-container">
                                <img src="./img/Preview02.png" alt="" srcset="" />
                            </div>
                        </div>


                    </div>
                </div>
            </div>

            <div class="row mt-5">
                <div class="h5">Ihre Daten</div>
                <div class="col-12 colContent">
                    <form name="modularform_basicinfo_form" class="form-horizontal modularform_basicinfo_form modularform_form" method="post" action="" enctype="multipart/form-data">
                        <div class="row">
                            <div class="col-12 col-lg-8 offset-lg-2">
                                <div class="col-12 float-start timespanRadio">
									<p class="ps-2">Wie m??chten Sie bez??glich dem Angebot Kontaktiert werden?</p>
									<label class="radiospanInput" for="rbtn_contact_1">Telefon</label>
									<input class="form-check-input " type="radio" name="contact" id="rbtn_contact_1">
									<label class="radiospanInput" for="rbtn_contact_2">E-Mail</label>
									<input class="form-check-input " type="radio" name="contact" id="rbtn_contact_2">
									
								</div>
                                <div class="modularinputgroup cnt4 mt-2">
                                    <div class="textinput styled">
                                        <input type="text" class="inputtext modularform_input modularform_textinput submiterr" id="input_vorname" name="input_vorname" placeholder="Vorname*" value="" required="" />
                                    </div>
                                    <div class="textinput styled">
                                        <input type="text" class="inputtext modularform_input modularform_textinput submiterr" id="input_name" name="input_name" placeholder="Name*" value="" required="" />
                                    </div>
                                    <div class="textinput styled">
                                        <input type="text" class="inputtext modularform_input modularform_textinput" id="input_strasse" name="input_strasse" placeholder="Stra??e" value="" />
                                    </div>
                                    <div class="textinput styled">
                                        <input type="text" class="inputtext modularform_input modularform_textinput" id="input_hausnummer" name="input_hausnummer" placeholder="Hausnummer" value="" />
                                    </div>
                                    <div class="textinput styled">
                                        <input type="text" class="inputtext modularform_input modularform_textinput" id="input_plzort" name="input_plzort" placeholder="PLZ, Ort" value="" />
                                    </div>
                                    <div class="textinput styled">
                                        <input type="text" class="inputtext modularform_input modularform_textinput" id="input_telefon" name="input_telefon" placeholder="Telefon" value="" />
                                    </div>
                                    <div class="textinput styled">
                                        <input type="email" class="inputtext modularform_input modularform_textinput submiterr" id="input_email" name="input_email" placeholder="E-Mail*" value="" required="" />
                                    </div>

                                     <div class="textinput textAreaInput styled">
										<textarea
											class="inputtext modularform_input modularform_textinput submiterr"
											id="input_freeText"
											name="input_freeText"
											placeholder="Anfrage*"
											value=""
											required=""
										></textarea>
									</div>
									<div class="col-12 float-start timespanRadio mt-2">
										<p class="ps-2">Wann m??chten Sie das Terrassendach aufstellen?</p>
										<label class="radiospanInput" for="rbtn1">Zeitnah</label>
										<input class="form-check-input " type="radio" name="timespan" id="rbtn1">
										<label class="radiospanInput" for="rbtn2">in den n??chsten 3 Monaten</label>
										<input class="form-check-input " type="radio" name="timespan" id="rbtn2">
										<label class="radiospanInput" for="rbtn3">In den n??chsten 6 Monaten</label>
										<input class="form-check-input " type="radio" name="timespan" id="rbtn3">
									</div>
                                </div>
                            </div>
                            <div class="col-12 col-lg-8 offset-lg-2 text-end">
                                <small class="">*Pflichtfelder</small>
                            </div>
                            <div class="btnContainer">
                                <button type="button" class="btn btn-secondary-menu formstepNext">
                    				Abschicken
                  				</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div> -->




    <!-- <div class="modalHeightInfo">
		<div class="blackOut"></div>
		<div class="modalContent">
			<div class="container-fluid">
				<div class="row mt-5">
					<div class="col-10 m-auto">
						<div class="h5">Some Headline</div>
						<div class="row">
							<div class="col-6 mt-5">
								<h5>Sparrenklaue</h5>
								<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem laboriosam molestiae veritatis sed deserunt inventore quam explicabo voluptatum facere debitis voluptate, delectus molestias aliquid consequatur incidunt dolores. Harum, nemo doloremque.</p>
							</div>
							<div class="col-6 mt-5">
								<h5>Schiebedach</h5>
								<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem laboriosam molestiae veritatis sed deserunt inventore quam explicabo voluptatum facere debitis voluptate, delectus molestias aliquid consequatur incidunt dolores. Harum, nemo doloremque.</p>
							</div>
							<div class="col-6 mt-5">
								<h5>Sparrenh??he</h5>
								<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem laboriosam molestiae veritatis sed deserunt inventore quam explicabo voluptatum facere debitis voluptate, delectus molestias aliquid consequatur incidunt dolores. Harum, nemo doloremque.</p>
							</div>
							<div class="col-6 mt-5">
								<h5>Irgendeine H??he</h5>
								<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem laboriosam molestiae veritatis sed deserunt inventore quam explicabo voluptatum facere debitis voluptate, delectus molestias aliquid consequatur incidunt dolores. Harum, nemo doloremque.</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="closeBtn-info"></div>
		</div>
	</div> -->





    </div>


    </div>
</body>

</html>