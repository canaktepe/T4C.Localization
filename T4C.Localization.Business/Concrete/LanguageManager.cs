using System.Collections.Generic;
using T4C.Localization.Business.Abstract;
using T4C.Localization.DataAccess.Abstract;
using T4C.Localization.Entities.Concrete.LanguageModels;

namespace T4C.Localization.Business.Concrete
{
    public class LanguageManager : ILanguageService
    {
        private readonly ILanguageDal _languageDal;

        public LanguageManager(ILanguageDal languageDal)
        {
            _languageDal = languageDal;
        }

        public List<Language> GetAll()
        {
            return _languageDal.GetAll();
        }

        public Language GetById(int id)
        {
            return _languageDal.Get(language => language.LanguageId == id);
        }

        public Language Add(Language language)
        {
            return _languageDal.Add(language);
        }

        public Language Update(Language language)
        {
            return _languageDal.Update(language);
        }

        public void Delete(Language language)
        {
            _languageDal.Delete(language);
        }

        public List<Language> GetByValue(string value)
        {
            return _languageDal.GetByValue(value);
        }
    }
}