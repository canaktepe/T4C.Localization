using System.Collections.Generic;
using T4C.Localization.DataAccess.Repository;
using T4C.Localization.Entities.Concrete.LanguageModels;

namespace T4C.Localization.DataAccess.Abstract
{
    public interface ILanguageDal : IEntityRepository<Language>
    {
        Language GetByValue(string value);
        List<Language> LookUp(string keyOrValue);
        List<Language> GetAllByCount(int count);
    }
}
