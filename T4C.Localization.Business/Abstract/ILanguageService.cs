using System.Collections.Generic;
using T4C.Localization.Entities.Concrete.LanguageModels;

namespace T4C.Localization.Business.Abstract
{
    public interface ILanguageService
    {
        List<Language> GetAll();
        Language GetById(int id);
        Language Add(Language language);
        Language Update(Language language);
        void Delete(Language language);
        List<Language> GetByValue(string value);
    }
}
