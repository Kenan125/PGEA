using AutoMapper;
using AutoMapper.Configuration;
using AutoMapper.Internal;
using System.Reflection;
using System.Runtime.CompilerServices;

namespace Services.Extensions
{
    public static class AutoMapperExstensions
    {
        [UnsafeAccessor(UnsafeAccessorKind.Method, Name = "get_TypeMapActions")]
        private static extern List<Action<TypeMap>> GetTypeMapActions(TypeMapConfiguration typeMapConfiguration);


        public static void ForAllOtherMembers<TSource, TDestination>(this IMappingExpression<TSource, TDestination> expression, Action<IMemberConfigurationExpression<TSource, TDestination, object>> memberOptions)
        {
            var typeMapConfiguration = (TypeMapConfiguration)expression;


            var typeMapActions = GetTypeMapActions(typeMapConfiguration);


            typeMapActions.Add(typeMap =>
            {
                var destinationTypeDetails = typeMap.DestinationTypeDetails;

                foreach (var accessor in destinationTypeDetails.WriteAccessors.Where(m => typeMapConfiguration.GetDestinationMemberConfiguration(m) == null))
                {
                    expression.ForMember(accessor.Name, memberOptions);
                }
            });
        }
    }
}
