"use strict";
/**
 * @author @KelvinCL
 * @author @amintasvrp
 */
const softSkillController = require("../controllers/soft");
const express = require("express");
const router = express.Router();
const { isEmpty, validate, filterProps } = require("../middlewares/util");

router
  .route("/")
  .get((request, response) => 
  {
    softSkillController.getAll().then((softSkills) => 
    {
      if (isEmpty(softSkills)) 
      {
        response.status(404).send("No soft skills to show.");
      } else 
      {
        response.send(softSkills);
      }
    });
  })

  .post(async (request, response) => {
    const { error, message } = validate(request.body, softSkillController);

    if (error) 
    {
      response.status(400).send("This soft skill cannot be created.");
    } 
    else 
    {
      const softSkill = softSkillController.create(request.body);
      response.send(softSkill);
    }
  });

router
  .route("/:id")
  .get(async (request, response) => 
  {
    softSkillController.getById(request.params.id).then((softSkill) => 
    {
      if (!softSkill) 
      {
        response.status(404).send("The soft skill with the given ID was not found.");
      } else 
      {
        response.send(softSkill);
      }
    });
  })

  .delete(async (request, response) => 
  {
    softSkillController.remove(request.params.id).then((softSkill) => 
    {
      if (!softSkill) 
      {
        response
          .status(404)
          .send("The soft skill with the given id was not found.");
      } 
      
      else 
      {
        response.send(softSkill);
      }
    });
  })

  //bug: ao atualizar apenas alguns parâmetros, os não atualizados se tornam 'null'.
  .put((request, response) => 
  {
    const id = request.params.id;
    const { error, message } = validate({ id, ...request.body }, softSkillController);
    if (error) 
    {
      response.status(400).send(message);
    } 
    
    else 
    {
      const { name } = request.body;

      softSkillController.update
      (
        request.params.id,
        filterProps({ name})
      )

      .then((softSkill) => 
      {
        if (!softSkill) 
        {
          response
            .status(404)
            .send("The soft skill with the given ID was not found.");
        } 
        
        else 
        {
          response.send(softSkill);
        }
      });
    }
  });

module.exports = router;
