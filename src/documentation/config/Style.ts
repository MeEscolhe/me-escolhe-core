export default () => `
  .swagger-ui .info img {
    content: url(http://localhost:8080/static/images/Logo-me-escolhe-v7.png);
    width: 169px;
    height: 76px;
  }
  .swagger-ui .info div.renderedMarkdown{

    height: 80px;

  }
  .swagger-ui .response-col_links {
    display:none;
  }
  .swagger-ui .info {
    display: flex;
    margin: 50px 0;
    flex-direction: row-reverse;
    width: 288px;
  }

  .swagger-ui .info div.renderedMarkdown p{
    display:flex;
    flex-direction:column;
    font-weight: bold;
    font-size: 20px;
  }
  .swagger-ui .info hgroup.main{
    display: flex;
    align-items: center;
  }
  .swagger-ui .topbar{
    display:none;
  }
  .swagger-ui .scheme-container{
    background:none;
    padding:0px 0px 30px 0px;
  }
  `;
