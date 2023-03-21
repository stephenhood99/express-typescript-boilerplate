export default class Exception {
  constructor(status: number, message: string, data: any=undefined) {
    this.status = status;
    this.message = message;
    this.data = data;
  }

  serverResponse() {
    if(this.data) {
      return {message: this.message, data: this.data};
    } else {
      return {message: this.message};
    }
  }

  status;
  message;
  data;
}