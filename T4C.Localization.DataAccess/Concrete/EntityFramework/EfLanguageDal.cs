using System.Collections.Generic;
using System.Linq;
using T4C.Localization.DataAccess.Abstract;
using T4C.Localization.DataAccess.Repository.EntityFramework;
using T4C.Localization.Entities.Concrete.LanguageModels;

namespace T4C.Localization.DataAccess.Concrete.EntityFramework
{
    public class EfLanguageDal : EfEntityRepositoryBase<Language, T4CLocalizationContext>, ILanguageDal
    {
        public Language GetByValue(string value)
        {
            using (var context = new T4CLocalizationContext())
            {
                var result = (from l in context.Languages.Where(l => l.Value==value) select l).FirstOrDefault();
                return result;
            }
        }

        public List<Language> LookUp(string keyOrValue)
        {
            using (var context = new T4CLocalizationContext())
            {
                var query = context.Languages.AsQueryable();
                int.TryParse(keyOrValue, out var key);
                query = key != 0 ? query.Where(l => l.LanguageId == key) : query.Where(l => l.Value.Contains(keyOrValue));
                return query.ToList();
            }
        }

        public List<Language> GetAllByCount(int count)
        {
            using (var context = new T4CLocalizationContext())
            {
                return context.Languages.OrderByDescending(l => l.LanguageId).Skip(0).Take(count).ToList();
            }
        }
    }
}
