"use strict";

/**
 * @author Kelvin Cirne <kelvin.cirne.custodio@ccc.ufcg.edu.br>
 * @author Amintas 
 */
const experienceController = require("../controllers/experience");
const express = require("express");
const router = express.Router();
const { isEmpty, validate, filterProps } = require("../middlewares/util");

router
  .route("/")
  .get((request, response) => 
  {
    experienceController.getAll().then
    (
      (experiences) => 
    {
      if (isEmpty(experiences)) 
      {
        response.status(404).send("No experience to show.");
      } else 
      {
        response.send(experiences);
      }
    });
  })

  .post(async (request, response) => {
    const { error, message } = validate(request.body, experienceController);

    if (error) 
    {
      response.status(400).send("This experience cannot be created.");
    } 
    else 
    {
      const experience = experienceController.create(request.body);
      response.send(experience);
    }
  });

router
  .route("/:id")
  .get(async (request, response) => 
  {
    experienceController.getById(request.params.id).then
    (
      (experience) => 
    {
      if (!experience) 
      {
        response.status(404).send("The experience with the given ID was not found.");
      } else 
      {
        response.send(experience);
      }
    }
    );
  })

  .delete(async (request, response) => 
  {
    experienceController.remove(request.params.id).then
    (
      (experience) => 
    {
      if (!experience) 
      {
        response
          .status(404)
          .send("The experience with the given id was not found.");
      } 
      
      else 
      {
        response.send(experience);
      }
    }
    );
  })

  //bug: ao atualizar apenas alguns parâmetros, os não atualizados se tornam 'null'.
  .put((request, response) => 
  {
    const id = request.params.id;
    const { error, message } = validate({ ...request.body }, experienceController);
    if (error) 
    {
      response.status(400).send(message);
    } 
    
    else 
    {
      const { academic, work } = request.body;

      experienceController.update
      (
        request.params.id,
        filterProps({ academic, work })
      )

      .then((experience) => 
      {
        if (!experience) 
        {
          response
            .status(404)
            .send("The experience with the given ID was not found.");
        } 
        
        else 
        {
          response.send(experience);
        }
      });
    }
  });

module.exports = router;
