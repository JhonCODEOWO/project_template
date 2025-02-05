//Interface para las respuestas de peticiones que irán con una paginación, su finalidad es darle al front-end la información necesaria para poder generar su paginación. TODO: Si deseas puedes generar el link directamente de la siguiente y anterior pagina y enviar eso al front-end.
export interface GetResponse {
  data: any[];
  items: number; //Conteo total de elementos existentes en data
  limit: number; //cantidad del limit de cada paginación
  offset: number; //Pagina actual de la paginación
}
