using System.Collections.Generic;
using T4C.Localization.DataAccess.Repository;
using T4C.Localization.Entities.Concrete.LanguageModels;

namespace T4C.Localization.DataAccess.Abstract
{
    public interface ILanguageDal : IEntityRepository<Language>
    {
        List<Language> GetByValue(string value);
    }
}
