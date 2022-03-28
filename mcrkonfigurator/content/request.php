<div class="modal_anfrage">
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
                <form name="modularform_basicinfo_form" class="form-horizontal modularform_basicinfo_form modularform_form" id="solidoRequestForm" method="post" action="" enctype="multipart/form-data">
                    <div class="row">
                        <div class="col-12 col-lg-8 offset-lg-2">
                            <div class="col-12 float-start timespanRadio">
                                <p class="ps-2">Wie möchten Sie bezüglich dem Angebot Kontaktiert werden?</p>
                                <label class="radiospanInput " name="contact" for="rbtn_contact_1">Telefon</label>
                                <input class="form-check-input required" type="radio" name="contact" id="rbtn_contact_1">
                                <label class="radiospanInput " name="contact" for="rbtn_contact_2">E-Mail</label>
                                <input class="form-check-input required" type="radio" name="contact" id="rbtn_contact_2">

                            </div>
                            <div class="modularinputgroup cnt4 mt-2">
                                <div class="textinput styled">
                                    <input type="text" class="inputtext modularform_input modularform_textinput submiterr required" id="input_vorname" name="input_vorname" placeholder="Vorname*" value="" required="" />
                                </div>
                                <div class="textinput styled">
                                    <input type="text" class="inputtext modularform_input modularform_textinput submiterr required" id="input_name" name="input_name" placeholder="Name*" value="" required="" />
                                </div>
                                <div class="textinput styled">
                                    <input type="text" class="inputtext modularform_input modularform_textinput" id="input_strasse" name="input_strasse" placeholder="Straße" value="" />
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
                                    <input type="email" class="inputtext modularform_input modularform_textinput submiterr required" id="input_email" name="input_email" placeholder="E-Mail*" value="" required="" />
                                </div>

                                <div class="textinput textAreaInput styled">
                                    <textarea
                                        class="inputtext modularform_input modularform_textinput submiterr required"
                                        id="input_freeText"
                                        name="input_freeText"
                                        placeholder="Anfrage*"
                                        value=""
                                        required=""></textarea>
                                </div>
                                <div class="col-12 float-start timespanRadio mt-2">
                                    <p class="ps-2">Wann möchten Sie das Terrassendach aufstellen?</p>
                                    <label class="radiospanInput" name="timespan" for="rbtn1">Zeitnah</label>
                                    <input class="form-check-input required" type="radio" name="timespan" id="rbtn1" required="">
                                    <label class="radiospanInput" name="timespan" for="rbtn2">in den nächsten 3 Monaten</label>
                                    <input class="form-check-input required" type="radio" name="timespan" id="rbtn2" required="">
                                    <label class="radiospanInput" name="timespan" for="rbtn3">In den nächsten 6 Monaten</label>
                                    <input class="form-check-input required" type="radio" name="timespan" id="rbtn3" required="">
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-lg-8 offset-lg-2 text-end">
                            <small class="">*Pflichtfelder</small>
                        </div>
                        <div class="btnContainer ">
                            <button type="submit" disabled id="request_form_submit" dataForm="solidoRequestForm" class="btn btn-secondary-menu formstepNext">
                                Abschicken
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>