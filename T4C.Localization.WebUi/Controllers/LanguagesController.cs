using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using T4C.Localization.Business.Abstract;

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
        [Route("GetByValue/{value}")]
        public IActionResult Get(string value)
        {
            var data = _languageManager.GetByValue(value);
            return Ok(data);
        }

        // GET: api/Default/5
        [HttpGet("{id}", Name = "GetById")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Default
        [HttpPost]
        public void Post([FromBody] string value)
        {
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