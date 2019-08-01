using System.Collections.Generic;
using System.Linq;
using T4C.Localization.DataAccess.Abstract;
using T4C.Localization.DataAccess.Repository.EntityFramework;
using T4C.Localization.Entities.Concrete.LanguageModels;

namespace T4C.Localization.DataAccess.Concrete.EntityFramework
{
    public class EfLanguageDal : EfEntityRepositoryBase<Language, T4CLocalizationContext>, ILanguageDal
    {
        public List<Language> GetByValue(string value)
        {
            using (var context = new T4CLocalizationContext())
            {
                var result = (from l in context.Languages.Where(l => l.Value.Contains(value)) select l).ToList();
                return result;
            }
        }
    }
}
