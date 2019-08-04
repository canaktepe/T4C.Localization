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
        Language GetByValue(string value);
        List<Language> LookUp(string keyOrValue);
        List<Language> GetLastLanguageItems(int count);
    }
}
