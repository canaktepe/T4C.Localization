using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using T4C.Localization.Business.Abstract;
using T4C.Localization.Entities.Concrete.LanguageModels;

namespace T4C.Localization.WebUi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LanguagesController : ControllerBase
    {
        private readonly ILanguageService _languageManager;

        public LanguagesController(ILanguageService languageManager)
        {
            _languageManager = languageManager;
        }

        // GET: api/Default
        [HttpGet]
        public IActionResult Get()
        {
            var data = _languageManager.GetAll();
            return Ok(data);
        }

        [HttpGet]
        [Route("LookUp/{value}")]
        public IActionResult Get(string value)
        {
            var data = _languageManager.LookUp(value);
            return Ok(data);
        }

        [HttpGet]
        [Route("GetLastLanguageItems/{count}")]
        public IActionResult Get(int count)
        {
            var data = _languageManager.GetLastLanguageItems(count);
            return Ok(data);
        }

        // POST: api/Default
        [HttpPost]
        public IActionResult Post([FromBody] string value)
        {
            var exists = _languageManager.GetByValue(value);
            if (exists != null)
            {
                return BadRequest(exists);
            }
            var model = new Language
            {
                Value = value
            };
            var data = _languageManager.Add(model);
            return Ok(data);
        }

        // PUT: api/Default/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}