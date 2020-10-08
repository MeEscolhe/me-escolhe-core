"use strict";
/**
 * @author Kelvin Cirne <kelvin.cirne.custodio@ccc.ufcg.edu.br>
 */
const academicExperienceController = require("../controllers/academic-experience");
const express = require("express");
const router = express.Router();
const { isEmpty, validate, filterProps } = require("../middlewares/util");

router
  .route("/")
  .get((request, response) => 
  {
    academicExperienceController.getAll().then((academicExperiences) => 
    {
      if (isEmpty(academicExperiences)) 
      {
        response.status(404).send("No academic experiences to show.");
      } else 
      {
        response.send(academicExperiences);
      }
    });
  })

  .post(async (request, response) => {
    const { error, message } = validate(request.body, academicExperienceController);

    if (error) 
    {
      response.status(400).send("This academic experience cannot be created.");
    } 
    else 
    {
      const academicExperience = academicExperienceController.create(request.body);
      response.send(academicExperience);
    }
  });

router
  .route("/:id")
  .get(async (request, response) => 
  {
    academicExperienceController.getById(request.params.id).then((academicExperience) => 
    {
      if (!academicExperience) 
      {
        response.status(404).send("The academic experience with the given ID was not found.");
      } else 
      {
        response.send(academicExperience);
      }
    });
  })

  .delete(async (request, response) => 
  {
    academicExperienceController.remove(request.params.id).then((academicExperience) => 
    {
      if (!academicExperience) 
      {
        response
          .status(404)
          .send("The academic experience with the given id was not found.");
      } 
      
      else 
      {
        response.send(academicExperience);
      }
    });
  })

  //bug: ao atualizar apenas alguns parâmetros, os não atualizados se tornam 'null'.
  .put((request, response) => 
  {
    const id = request.params.id;
    const { error, message } = validate({ id, ...request.body }, academicExperienceController);
    if (error) 
    {
      response.status(400).send(message);
    } 
    
    else 
    {
      const { title, category, institution } = request.body;

      academicExperienceController.update
      (
        request.params.id,
        filterProps({ title, category, institution })
      )

      .then((academicExperience) => 
      {
        if (!academicExperience) 
        {
          response
            .status(404)
            .send("The academic experience with the given ID was not found.");
        } 
        
        else 
        {
          response.send(academicExperience);
        }
      });
    }
  });

module.exports = router;
