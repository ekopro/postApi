"use strict";
var createEI = (function () {
    function createEI(apiKey, modelName, calledMethod, methodProperties, PayerType, PaymentMethod, DateTime, CargoType, VolumeGeneral, Weight, ServiceType, SeatsAmount, Description, Cost, CitySender, Sender, SenderAddress, ContactSender, SenderPhone, CityRecipient, Recipient, RecipientAddress, ContactRecipient, RecipientsPhone) {
        this.apiKey = apiKey;
        this.modelName = modelName;
        this.calledMethod = calledMethod;
        this.methodProperties = methodProperties;
        this.PayerType = PayerType;
        this.PaymentMethod = PaymentMethod;
        this.DateTime = DateTime;
        this.CargoType = CargoType;
        this.VolumeGeneral = VolumeGeneral;
        this.Weight = Weight;
        this.ServiceType = ServiceType;
        this.SeatsAmount = SeatsAmount;
        this.Description = Description;
        this.Cost = Cost;
        this.CitySender = CitySender;
        this.Sender = Sender;
        this.SenderAddress = SenderAddress;
        this.ContactSender = ContactSender;
        this.SenderPhone = SenderPhone;
        this.CityRecipient = CityRecipient;
        this.Recipient = Recipient;
        this.RecipientAddress = RecipientAddress;
        this.ContactRecipient = ContactRecipient;
        this.RecipientsPhone = RecipientsPhone;
    }
    return createEI;
}());
exports.createEI = createEI;
//# sourceMappingURL=ei-create.js.map