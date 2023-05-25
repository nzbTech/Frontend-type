const myMixin = {
    data() {
      return {
        message: 'Hello from mixin!'
      }
    },
    methods: {
      greet() {
        console.log(this.message);
      }
    }
}
  
export default myMixin