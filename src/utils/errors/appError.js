class AppError extends Error {
    constructor(status, msgDetails, msgDescription) {
        super(msgDescription);
        this.status = status;
        this.msgDetails = msgDetails;
        this.msgDescription = msgDescription;
    }
}


module.exports = AppError